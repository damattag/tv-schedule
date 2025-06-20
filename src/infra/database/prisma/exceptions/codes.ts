export const prismaErrorCodes = [
  // Database Engine Errors (P1xxx)
  { errorCode: 'P1001', httpStatus: 503 }, // Can't reach database server
  { errorCode: 'P1002', httpStatus: 503 }, // Database server timeout
  { errorCode: 'P1003', httpStatus: 404 }, // Database does not exist
  { errorCode: 'P1008', httpStatus: 408 }, // Operations timed out
  { errorCode: 'P1009', httpStatus: 409 }, // Database already exists
  { errorCode: 'P1010', httpStatus: 403 }, // User denied access
  { errorCode: 'P1011', httpStatus: 503 }, // Error opening TLS connection
  { errorCode: 'P1012', httpStatus: 400 }, // Schema parsing/validation errors
  { errorCode: 'P1013', httpStatus: 400 }, // Invalid database string
  { errorCode: 'P1014', httpStatus: 404 }, // Underlying model does not exist
  { errorCode: 'P1015', httpStatus: 400 }, // Unsupported database features
  { errorCode: 'P1016', httpStatus: 400 }, // Incorrect number of parameters
  { errorCode: 'P1017', httpStatus: 503 }, // Server closed connection

  // Query Engine Errors (P2xxx)
  { errorCode: 'P2000', httpStatus: 400 }, // Value too long for column
  { errorCode: 'P2001', httpStatus: 404 }, // Record not found
  { errorCode: 'P2002', httpStatus: 409 }, // Unique constraint failed
  { errorCode: 'P2003', httpStatus: 400 }, // Foreign key constraint failed
  { errorCode: 'P2004', httpStatus: 400 }, // Database constraint failed
  { errorCode: 'P2005', httpStatus: 400 }, // Invalid value for field type
  { errorCode: 'P2006', httpStatus: 400 }, // Invalid field value
  { errorCode: 'P2007', httpStatus: 400 }, // Data validation error
  { errorCode: 'P2008', httpStatus: 400 }, // Query parsing failed
  { errorCode: 'P2009', httpStatus: 400 }, // Query validation failed
  { errorCode: 'P2010', httpStatus: 500 }, // Raw query failed
  { errorCode: 'P2011', httpStatus: 400 }, // Null constraint violation
  { errorCode: 'P2012', httpStatus: 400 }, // Missing required value
  { errorCode: 'P2013', httpStatus: 400 }, // Missing required argument
  { errorCode: 'P2014', httpStatus: 400 }, // Required relation violation
  { errorCode: 'P2015', httpStatus: 404 }, // Related record not found
  { errorCode: 'P2016', httpStatus: 400 }, // Query interpretation error
  { errorCode: 'P2017', httpStatus: 400 }, // Records not connected
  { errorCode: 'P2018', httpStatus: 404 }, // Required connected records not found
  { errorCode: 'P2019', httpStatus: 400 }, // Input error
  { errorCode: 'P2020', httpStatus: 400 }, // Value out of range
  { errorCode: 'P2021', httpStatus: 404 }, // Table does not exist
  { errorCode: 'P2022', httpStatus: 404 }, // Column does not exist
  { errorCode: 'P2023', httpStatus: 500 }, // Inconsistent column data
  { errorCode: 'P2024', httpStatus: 503 }, // Connection pool timeout
  { errorCode: 'P2025', httpStatus: 404 }, // Required records not found
  { errorCode: 'P2026', httpStatus: 501 }, // Feature not supported
  { errorCode: 'P2027', httpStatus: 500 }, // Multiple database errors
  { errorCode: 'P2028', httpStatus: 500 }, // Transaction API error
  { errorCode: 'P2029', httpStatus: 400 }, // Query parameter limit exceeded
  { errorCode: 'P2030', httpStatus: 400 }, // Fulltext index not found
  { errorCode: 'P2031', httpStatus: 503 }, // MongoDB replica set required
  { errorCode: 'P2033', httpStatus: 400 }, // Number doesn't fit 64-bit integer
  { errorCode: 'P2034', httpStatus: 409 }, // Transaction conflict/deadlock
  { errorCode: 'P2035', httpStatus: 500 }, // Database assertion violation
  { errorCode: 'P2036', httpStatus: 500 }, // External connector error
  { errorCode: 'P2037', httpStatus: 503 }, // Too many database connections

  // Schema Engine/Migrate Errors (P3xxx)
  { errorCode: 'P3000', httpStatus: 500 }, // Failed to create database
  { errorCode: 'P3001', httpStatus: 409 }, // Migration with destructive changes
  { errorCode: 'P3002', httpStatus: 500 }, // Migration rolled back
  { errorCode: 'P3003', httpStatus: 500 }, // Migration format changed
  { errorCode: 'P3004', httpStatus: 403 }, // System database alteration denied
  { errorCode: 'P3005', httpStatus: 409 }, // Database schema not empty
  { errorCode: 'P3006', httpStatus: 500 }, // Migration failed on shadow database
  { errorCode: 'P3007', httpStatus: 400 }, // Preview features not allowed
  { errorCode: 'P3008', httpStatus: 409 }, // Migration already applied
  { errorCode: 'P3009', httpStatus: 500 }, // Failed migrations found
  { errorCode: 'P3010', httpStatus: 400 }, // Migration name too long
  { errorCode: 'P3011', httpStatus: 400 }, // Migration cannot be rolled back
  { errorCode: 'P3012', httpStatus: 400 }, // Migration not in failed state
  { errorCode: 'P3013', httpStatus: 400 }, // Provider arrays not supported
  { errorCode: 'P3014', httpStatus: 503 }, // Shadow database creation failed
  { errorCode: 'P3015', httpStatus: 404 }, // Migration file not found
  { errorCode: 'P3016', httpStatus: 500 }, // Database reset fallback failed
  { errorCode: 'P3017', httpStatus: 404 }, // Migration not found
  { errorCode: 'P3018', httpStatus: 500 }, // Migration failed to apply
  { errorCode: 'P3019', httpStatus: 409 }, // Datasource provider mismatch
  { errorCode: 'P3020', httpStatus: 503 }, // Shadow database disabled on Azure SQL
  { errorCode: 'P3021', httpStatus: 501 }, // Foreign keys not supported
  { errorCode: 'P3022', httpStatus: 501 }, // Direct DDL execution disabled

  // Introspection Errors (P4xxx)
  { errorCode: 'P4000', httpStatus: 500 }, // Introspection failed
  { errorCode: 'P4001', httpStatus: 404 }, // Database was empty
  { errorCode: 'P4002', httpStatus: 500 }, // Inconsistent database schema

  // Prisma Accelerate Errors (P6xxx)
  { errorCode: 'P6000', httpStatus: 500 }, // Generic server error
  { errorCode: 'P6001', httpStatus: 400 }, // Invalid data source URL
  { errorCode: 'P6002', httpStatus: 401 }, // Invalid API key
  { errorCode: 'P6003', httpStatus: 402 }, // Plan limit reached
  { errorCode: 'P6004', httpStatus: 408 }, // Query timeout
  { errorCode: 'P6005', httpStatus: 400 }, // Invalid parameters
  { errorCode: 'P6006', httpStatus: 400 }, // Version not supported
  { errorCode: 'P6008', httpStatus: 503 }, // Engine connection error
  { errorCode: 'P6009', httpStatus: 413 }, // Response size limit exceeded
  { errorCode: 'P6010', httpStatus: 403 }, // Project disabled

  // Rate Limiting Error
  { errorCode: 'P5011', httpStatus: 429 }, // Too many requests
];
