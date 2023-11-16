import re
from django.db import models


class AdminManager(models.Manager):
    def basic_validator(self, postData):
        errors = {}
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

        if len(postData['first_name']) < 2:
            errors['first_name'] = "First name should be at least 2 characters."
        if len(postData['last_name']) < 2:
            errors['last_name'] = "Last name should be at least 2 characters."

        if not postData['email']:
            errors['email'] = 'Please enter an email address.'
        elif not EMAIL_REGEX.match(postData['email']):
            errors['email'] = 'Invalid email address.'
        if Admin.objects.filter(email=postData['email']):
            errors['email_exists'] = "There's already an account with that email."

        if postData['password'] != postData['confirm_pw']:
            errors['confirm_pw'] = 'Passwords do not match.'
        if len(postData['password']) < 8:
            errors['password'] = 'Password should be at least 8 characters.'

        return errors


class Admin(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = AdminManager()
