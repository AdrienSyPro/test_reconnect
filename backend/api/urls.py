from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers, serializers, viewsets

from . import views
from .models import Beneficiary

from django.shortcuts import get_object_or_404
from rest_framework.response import Response

# Serializers define the API representation.
class BeneficiarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Beneficiary
        fields = ['name']

# ViewSets define the view behavior.


class BeneficiaryViewSet(viewsets.ModelViewSet):
    queryset = Beneficiary.objects.all()
    serializer_class = BeneficiarySerializer

    def list(self, request):
        queryset = Beneficiary.objects.all()
        serializer = BeneficiarySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Beneficiary.objects.all()
        beneficiary = get_object_or_404(queryset, name=pk)
        serializer = BeneficiarySerializer(beneficiary)
        return Response(serializer.data)
        
    def destroy(self, request, pk=None):
        queryset = Beneficiary.objects.all()
        beneficiary = get_object_or_404(queryset, name=pk)
        self.perform_destroy(beneficiary)
        return Response()

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'beneficiaries', BeneficiaryViewSet, basename='beneficiary')

urlpatterns = [
    url(r'^', include(router.urls)),
]
