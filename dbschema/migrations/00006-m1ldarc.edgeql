CREATE MIGRATION m1ldarc43sff5eiy5gbq5td45aqz76qrqteyrtjbv7cy3bvzmc5wda
    ONTO m1mtacnspx7wl6bbwtpjder7lse54g5enzmavkxfjumppphuqmyqha
{
  ALTER TYPE default::Player {
      CREATE PROPERTY account_status: std::str;
      CREATE INDEX ON (.account_status);
  };
};
