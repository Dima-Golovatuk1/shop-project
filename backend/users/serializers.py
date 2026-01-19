from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .models import MyUser


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username', 'email', 'phone_number')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ("username", "email", "phone_number", "password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "password doesn't match"})
        
        return attrs

    def validate_phone_number(self, value):
        if MyUser.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError({"phone_number": "this number already registered"})
            
        
        return value

    def create(self, validated_data):
        validated_data.pop("password2")
        user = MyUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            phone_number=validated_data.get("phone_number"),
            password=validated_data["password"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Email and password are required")

        try:
            user_object = MyUser.objects.get(email=email)

            username = user_object.username
        
            if not username:
                raise serializers.ValidationError("User has no username")
            
            
            user = authenticate(username=username, password=password)
            
            if not user:
                raise serializers.ValidationError("Incorrect email or password")

            attrs["user"] = user
        
        
        except MyUser.DoesNotExist:
            raise serializers.ValidationError("User with this email doesn't exist")
        
        except Exception as e:
            raise serializers.ValidationError(str(e))
        
        return attrs