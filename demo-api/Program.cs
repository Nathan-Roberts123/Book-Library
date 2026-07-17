using Amazon;
using Amazon.CognitoIdentityProvider;
using Amazon.S3;
using demo_api;
using demo_api.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DemoAPIContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

builder.Services.AddAuthorization();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

builder.Services.ConfigureOptions<JwtBearerConfigureOptions>();

builder.Services.Configure<S3Settings>(builder.Configuration.GetSection("S3Settings"));

builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var s3settings = sp.GetRequiredService<IOptions<S3Settings>>().Value;
    var config = new AmazonS3Config
    {
        RegionEndpoint = RegionEndpoint.GetBySystemName(s3settings.Region)
    };

    return new AmazonS3Client(config);
});

builder.Services.AddSingleton<IAmazonCognitoIdentityProvider>(_ =>
{
    return new AmazonCognitoIdentityProviderClient(RegionEndpoint.USEast1);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
