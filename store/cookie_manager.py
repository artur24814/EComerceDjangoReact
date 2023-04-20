import json
from .models import *

def getOrder(cookie):
	items = []
	order = {'get_cart_total':0, 'get_cart_items':0, 'shipping':False}
	cartItems = order['get_cart_items']

	for cookieId in cookie:
		#We use try block to prevent items in cart that may have been removed from causing error
		try:
			i=cookieId.split('-')[0]
			size=Size.objects.get(name=cookieId.split('-')[1])

			cartItems += cookie[cookieId]['quantity']
			product = Product.objects.get(id=i)

			total = (product.price * cookie[cookieId]['quantity'])

			order['get_cart_total'] += total
			order['get_cart_items'] += cookie[cookieId]['quantity']

			item = {
				'id':product.id,
				'product':{'id':product.id,'title':product.title, 'price':product.price, 'description':product.description, 'category': product.category.name, 'size': size.name,
				'imageURL':product.imageURL}, 'quantity':cookie[cookieId]['quantity'], 'get_total':total,
				}
			items.append(item)
		except:
			pass
			
	return {'cartItems':cartItems ,'order':order, 'items':items}