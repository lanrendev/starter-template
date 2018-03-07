#!/bin/bash

# 生成私钥 key 文件
openssl genrsa 1024 > private.pem

# 通过私钥文件生成 CSR 证书签名
openssl req -new -key private.pem -out csr.pem

# 通过私钥文件和 CSR 证书签名生成证书文件
openssl x509 -req -days 365 -in csr.pem -signkey private.pem -out file.crt

echo "生成证书成功！"
