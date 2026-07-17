using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

namespace demo_api
{
    public class JwtBearerConfigureOptions(IConfiguration configuration)
        : IConfigureNamedOptions<JwtBearerOptions>
    {
        private const string ConfigurationSectionName = "JwtBearer";

        public void Configure(string? name, JwtBearerOptions options)
        {
            Configure(options);
        }

        public void Configure(JwtBearerOptions options)
        {
            configuration.GetSection(ConfigurationSectionName).Bind(options);

            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine($"JWT Auth Failed: {context.Exception.Message}");
                    return Task.CompletedTask;
                },
                OnTokenValidated = context =>
                {
                    Console.WriteLine("JWT Auth Succeeded!");
                    return Task.CompletedTask;
                },
     
            };
        }
    }
}
