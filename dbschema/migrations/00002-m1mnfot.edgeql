CREATE MIGRATION m1mnfotxluvpe7ufey2eu3xsaqfw4soscq5r2zjjqw7b5vtdw2p3uq
    ONTO m1wgup27usqbt5iuusd65ccfol3lkyujic7huqovhgd7pzctj7nacq
{
  ALTER TYPE default::Profile {
      CREATE PROPERTY border_color: std::str;
  };
};
