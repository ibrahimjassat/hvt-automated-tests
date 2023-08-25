import { sign, SignOptions } from 'jsonwebtoken';

export const getValidToken = (): string => tokenGenerator({ algorithm:'HS256', issuer:'issuer', 'expiresIn':60 * 60, subject:'396e3a58-43d6-4989-be28-2d018f2ee85a' }, getJwtSecret(), { startDate:Date.now(), endDate:Math.floor(+new Date() / 1000) + 14 * 24 * 60 * 60 });

export const getExpiredToken = (): string => tokenGenerator({ algorithm:'HS256', issuer:'issuer', 'expiresIn':0, subject:'396e3a58-43d6-4989-be28-2d018f2ee85a' }, getJwtSecret(), { startDate:1619395199, endDate:1619395199 });

export const getInvalidToken = (): string => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFydERhdGUiOjE2MDE5OTQxMDUsImVuZERhdGUiOjE2MDQ0MTMzMDUsImlzQXZhaWxhYmxlIjp0cnVlLCJpYXQiOjMxNTUzMjgwMCwiZXhwIjozMTYwNTEyMDAsImlzcyI6Imh0dHBzOi8vYm9vay1oZ3YtYnVzLXRyYWlsZXItbW90LnNlcnZpY2UuZ292LnVrIiwic3ViIjoiMUQ2MkFCRkQtRjAzRC00REUwLTlFRDUtOEMwMkY5N0M1NTNEIn0.xW2aFHfxhXDTkxXTtqAEdnHlyJtdFhDwXdRIPqLBIck';

export const getJwtSecret = (): string => {
  return process.env.JWT_SECRET
};

interface payload {
  startDate?:number,
  endDate?:number
}

const tokenGenerator = (options: SignOptions, secret:string, payload?:payload ):string => {
  return sign(payload || {}, secret, options);
};
