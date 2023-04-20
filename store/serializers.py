from rest_framework import serializers
from .models import Product, Size, Category, Order

class ProductSerializer(serializers.ModelSerializer):
    sizes = serializers.StringRelatedField(many=True)
    category = serializers.StringRelatedField(many=False)

    class Meta:
        model = Product
        fields = '__all__'

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'