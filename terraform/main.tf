terraform {
  required_version = "0.15.1"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.37.0"
    }
  }

  backend "s3" {
    bucket         = "jmfb-terraform"
    key            = "word-sleuth"
    region         = "us-east-1"
    dynamodb_table = "tfstate-lock"
  }
}

provider "aws" {
  region = "us-east-1"
}
