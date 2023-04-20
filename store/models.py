import stripe
import os

from django.db import models
from django.contrib.auth.models import User

STRYPE_SECRET_KEY = str(os.environ.get('STRIPE_SECRET_KEY'))

stripe.api_key = STRYPE_SECRET_KEY

class Customer(models.Model):
	user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
	name = models.CharField(max_length=200, null=True)
	email = models.CharField(max_length=200, unique=True)

	def __str__(self):
		return self.name
	
	
class Category(models.Model):
	name =  models.CharField(max_length=200, blank=False)

	def __str__(self):
		return self.name
	
	
class Size(models.Model):
	name = models.CharField(max_length=100)

	def __str__(self):
		return self.name
	
	
class Product(models.Model):
	title = models.CharField(max_length=500, blank=False)
	description = models.TextField()
	image = models.ImageField(null=True, blank=True)
	category = models.ForeignKey('Category', on_delete=models.CASCADE)
	price = models.DecimalField(max_digits=10,decimal_places=2)
	available = models.BooleanField(default=True)
	date_added = models.DateTimeField(auto_now=True)
	sizes = models.ManyToManyField(Size,  related_name="products")
	stripe_product_id = models.CharField(max_length=400, null=True, blank=True)
	discount= models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True)
	
	@property
	def imageURL(self):
		try:
			url = self.image.url
		except:
			url = ''
		return url
	
	def __str__(self):
		return self.title
	
	class Meta:
	    ordering = ['date_added']
		
	# def save(self, *args, **kwargs):
	# 	stripe_prod_obj = stripe.Product.create(name=self.title)
	# 	self.stripe_product_id = stripe_prod_obj.stripe_id
	# 	super().save(*args, **kwargs)
	

class Order(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
	date_ordered = models.DateTimeField(auto_now_add=True)
	complete = models.BooleanField(default=False)
	transaction_id = models.CharField(max_length=220, null=True)
	timestamp =models.DateTimeField(auto_now_add=True, null=True)


	def get_cart_total(self):
		orderitems = self.orderitem_set.all()
		total = sum([item.get_total for item in orderitems])
		return total 

	@property
	def get_cart_items(self):
		orderitems = self.orderitem_set.all()
		total = sum([item.quantity for item in orderitems])
		return total
	


class OrderItem(models.Model):
	product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
	size= models.ForeignKey(Size, on_delete=models.SET_NULL, null=True)
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
	quantity = models.IntegerField(default=0, null=True, blank=True)
	date_added = models.DateTimeField(auto_now_add=True)

	@property
	def get_total(self):
		total = self.product.price * self.quantity
		return total
	
	def __str__(self):
		return f'{self.product.title} {self.size} {self.date_added.strftime("%d/%m/%Y %H:%M")}'
	


class ShippingAddress(models.Model):
	customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
	address = models.CharField(max_length=200, null=False)
	city = models.CharField(max_length=200, null=False)
	state = models.CharField(max_length=200, null=False)
	zipcode = models.CharField(max_length=200, null=False)
	date_added = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.address
