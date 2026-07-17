using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using demo_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;


namespace demo_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAmazonCognitoIdentityProvider _cognito;
        private readonly IConfiguration _configuration;
        string clientId;
        string clientSecret;

        public AuthController(IAmazonCognitoIdentityProvider cognito, IConfiguration configuration)
        {
            _cognito = cognito;
            _configuration = configuration;
            clientId = _configuration["AWS:Cognito:ClientId"]!;
            clientSecret = _configuration["AWS:Cognito:ClientSecret"]!;
        }

        private string GenerateSecretHash(string username, string clientId, string clientSecret)
        {
            var key = Encoding.UTF8.GetBytes(clientSecret);
        
            using var hmac = new HMACSHA256(key);
        
            var data = Encoding.UTF8.GetBytes(username + clientId);
        
            return Convert.ToBase64String(hmac.ComputeHash(data));
        }

        private async Task<AuthenticationResultType> SignInAsync(string email, string password)
        {
            var request = new InitiateAuthRequest
            {
                ClientId = clientId,
                AuthFlow = AuthFlowType.USER_PASSWORD_AUTH,
                AuthParameters = new Dictionary<string, string>
                {
                    { "USERNAME", email },
                    { "PASSWORD", password },
                    { "SECRET_HASH", GenerateSecretHash(email, clientId, clientSecret) }
                }
            };

            var response = await _cognito.InitiateAuthAsync(request);

            return response.AuthenticationResult;
        }

        private async Task<AuthenticationResultType> RefreshTokenAsync(string refreshToken, string email)
        {
            var refreshTokenRequest = new InitiateAuthRequest
            {
                ClientId = clientId,
                AuthFlow = AuthFlowType.REFRESH_TOKEN,
                AuthParameters = new Dictionary<string, string>
                {
                    { "REFRESH_TOKEN", refreshToken },
                    { "SECRET_HASH", GenerateSecretHash(email, clientId, clientSecret) }
                }
            };

            var response = await _cognito.InitiateAuthAsync(refreshTokenRequest);

            return response.AuthenticationResult;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(SignUpRequestDto request)
        {
            var signUpRequest = new SignUpRequest
            {
                ClientId = clientId,
                SecretHash = GenerateSecretHash(request.Email, clientId, clientSecret),
                Username = request.Email,
                Password = request.Password,
                UserAttributes = new List<AttributeType>
                {
                    // Keep this so Cognito maps the email attribute properly
                    new AttributeType { Name = "email", Value = request.Email }
                }
            };

            try
            {
                SignUpResponse response = await _cognito.SignUpAsync(signUpRequest);
                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message }); ;
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(SignUpRequestDto request)
        {
            try
            {
                var response = await SignInAsync(request.Email, request.Password);

                var user = await _cognito.GetUserAsync(new GetUserRequest
                {
                    AccessToken = response.AccessToken,
                });

                return Ok(new { message = response, username = user.Username });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message }); ;
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(RefreshTokenDto request)
        {
            try
            {
                var result = await RefreshTokenAsync(request.RefreshToken, request.Username);

                return Ok(new
                {
                    username = request.Username,
                    AccessToken = result.AccessToken,
                    IdToken = result.IdToken,
                    ExpiresIn = result.ExpiresIn
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message }); ;
            }
        }

        [HttpPost("signout")]
        public async Task<IActionResult> SignOut(SignOutDto request)
        {
            await _cognito.RevokeTokenAsync(new RevokeTokenRequest
            {
                ClientId = clientId,
                ClientSecret = clientSecret,
                Token = request.RefreshToken
            });

            return NoContent();
        }
    }
}
