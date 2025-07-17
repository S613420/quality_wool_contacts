# Security Policy

## 🔒 Handling Sensitive Information

This repository has been configured to safely handle sensitive information while being publicly accessible.

### ✅ What's Safe to Commit

- Example configuration files (e.g., `firebase.example.js`)
- Public Firebase rules and configuration
- Build and deployment scripts
- Documentation and guides
- Source code without hardcoded secrets

### ❌ What Should NEVER be Committed

- Actual Firebase configuration with real API keys
- Service account keys (`.json` files)
- Environment files with real values (`.env`, `.env.local`, etc.)
- Any files containing:
  - API keys
  - Database passwords
  - OAuth client secrets
  - Private keys or certificates

### 🛡️ Security Measures in Place

1. **`.gitignore`** - Prevents accidental commits of sensitive files
2. **GitHub Secrets** - Secure storage for configuration values
3. **CI/CD Pipeline** - Dynamically creates config files during build
4. **Example Files** - Template files showing required structure

### 🚨 If Sensitive Data is Accidentally Committed

1. **Immediately** revoke/regenerate the exposed credentials
2. Remove the sensitive data from Git history:
   ```bash
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch path/to/sensitive/file' \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. Force push to rewrite history: `git push origin --force --all`
4. Update GitHub secrets with new credentials

### 📋 Security Checklist for Contributors

- [ ] No hardcoded API keys or secrets in code
- [ ] All sensitive files are in `.gitignore`
- [ ] Using environment variables or GitHub secrets for configuration
- [ ] Example files are provided for required config structure
- [ ] No sensitive information in commit messages or PR descriptions

### 🔍 Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do NOT** open a public issue
2. Email the maintainers directly
3. Include detailed information about the vulnerability
4. Allow time for the issue to be resolved before public disclosure

### 📚 Security Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)