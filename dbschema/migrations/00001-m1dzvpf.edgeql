CREATE MIGRATION m1dzvpfsbbcaw26peedtwirosojfomnofqpwavhkxnprsmdqn6mquq
    ONTO initial
{
  CREATE TYPE default::Player {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY username: std::str;
  };
};
