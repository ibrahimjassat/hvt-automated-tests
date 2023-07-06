import { sign, SignOptions } from 'jsonwebtoken';

export const getValidToken = (): string => tokenGenerator({ algorithm:'HS256', issuer:'issuer', 'expiresIn':60 * 60, subject:'856090d1-f2dc-4bbc-ad36-8d14382339e0' }, getJwtSecret(), { startDate:Date.now(), endDate:Math.floor(+new Date() / 1000) + 14 * 24 * 60 * 60 });

export const getExpiredToken = (): string => tokenGenerator({ algorithm:'HS256', issuer:'issuer', 'expiresIn':0, subject:'856090d1-f2dc-4bbc-ad36-8d14382339e0' }, getJwtSecret(), { startDate:1619395199, endDate:1619395199 });

export const getInvalidToken = (): string => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFydERhdGUiOjE2MDE5OTQxMDUsImVuZERhdGUiOjE2MDQ0MTMzMDUsImlzQXZhaWxhYmxlIjp0cnVlLCJpYXQiOjMxNTUzMjgwMCwiZXhwIjozMTYwNTEyMDAsImlzcyI6Imh0dHBzOi8vYm9vay1oZ3YtYnVzLXRyYWlsZXItbW90LnNlcnZpY2UuZ292LnVrIiwic3ViIjoiMUQ2MkFCRkQtRjAzRC00REUwLTlFRDUtOEMwMkY5N0M1NTNEIn0.xW2aFHfxhXDTkxXTtqAEdnHlyJtdFhDwXdRIPqLBIck';

export const getJwtSecret = (): string => process.env.JWT_SECRET;

interface payload {
  startDate?:number,
  endDate?:number
}

const tokenGenerator = (options: SignOptions, secret:string, payload?:payload ):string => {
  return sign(payload || {}, secret, options);
};
