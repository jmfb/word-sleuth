resource "aws_dynamodb_table" "games" {
  name = "word-sleuth-games"
  billing_mode = "PROVISIONED"
  read_capacity = 1
  write_capacity = 1
  hash_key = "UserId"
  range_key = "GameId"

  attribute {
    name = "UserId"
    type = "S"
  }

  attribute {
    name = "GameId"
    type = "N"
  }

  tags = merge(var.tags, tomap({
    "Name" = "word-sleuth-games"
  }))
}
