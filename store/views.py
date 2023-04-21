from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import action

from .serializers import ProductSerializer, SizeSerializer, CategorySerializer
from .models import Product, Size, Category
from .cookie_manager import getOrder

import json

import os

class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product instances.
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def retrieve(self, request, pk=None):
        instance =  get_object_or_404(Product, id=pk)
        serializer = ProductSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_queryset(self):
        qs = Product.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            qs =  qs.filter(title__icontains = title)
        return qs

class SizeList(generics.ListCreateAPIView):
    """
    A view for viewing and create Sizes
    """
    queryset = Size.objects.all()
    serializer_class = SizeSerializer

class CategoryList(generics.ListCreateAPIView):
    """
    A view for viewing and create Categorys
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@csrf_exempt
def user_order(request):
    cookie = json.loads(request.body)
    orders = getOrder(cookie)
    return JsonResponse(orders, safe=False)

@api_view(['GET'])
def config_view(request):
    publick_key = os.environ.get('SRTIPE_PUBLICK_KEY')
    return Response(publick_key, status=status.HTTP_200_OK)

@api_view(['POST'])
def payment_create(request):
    import stripe
    stripe.api_key = str(os.environ.get('STRIPE_SECRET_KEY'))
    total_amount = request.data['totalPrice']
    try:
        payment_id = stripe.PaymentIntent.create(
            amount=int(total_amount) * 100,
            currency="pln",
            automatic_payment_methods={"enabled": True},
            )
        return Response(payment_id.client_secret, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()
