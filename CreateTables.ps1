$ErrorActionPreference = "Stop"

try {
	Write-Host "[$(Get-Date)] Creating word-sleuth-games table..."
	& aws dynamodb create-table `
		--endpoint-url http://localhost:8000 `
		--table-name "word-sleuth-games" `
		--attribute-definitions `
			AttributeName=UserId,AttributeType=S `
			AttributeName=GameId,AttributeType=N `
		--key-schema `
			AttributeName=UserId,KeyType=HASH `
			AttributeName=GameId,KeyType=RANGE `
		--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 | Out-Null
	if ($lastexitcode -ne 0) {
		exit $lastexitcode
	}

	exit 0
} catch {
	Write-Host $_ -BackgroundColor Red
	exit -1
}
