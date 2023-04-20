from django.contrib import admin
from django.urls import path, include
from .views import (ProductViewSet, SizeList, CategoryList, user_order, config_view, payment_create)
from rest_framework import routers

app_name = 'store'

router = routers.DefaultRouter()

router.register(r'products', ProductViewSet)

urlpatterns = [
    # path('products/', ProductViewSet.as_view({'get': 'list, retrieve', 'post': 'create'}), name='products'),
    path('size/', SizeList.as_view(), name='sizes'),
    path('category/', CategoryList.as_view(), name='categorys'),
    path('card-order/', user_order, name='card-order'),
    path('config/', config_view, name='config-view'),
    path('payment/', payment_create, name='payment-start')
]
urlpatterns += router.urls