#!/bin/bash

echo "🧪 Testing Backend Auth Endpoints..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test if backend is running
echo "1️⃣  Checking if backend is running on port 8080..."
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${RED}❌ Backend is NOT running on port 8080${NC}"
    echo "   Start it with: cd backend && ./mvnw spring-boot:run"
    exit 1
fi

echo ""
echo "2️⃣  Testing /auth/register endpoint..."
REGISTER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -d "{\"username\":\"testuser_$(date +%s)\",\"password\":\"testpass123\"}")

HTTP_CODE=$(echo "$REGISTER_RESPONSE" | tail -n1)
BODY=$(echo "$REGISTER_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Registration works! Response: $BODY${NC}"
elif [ "$HTTP_CODE" = "400" ]; then
    echo -e "${YELLOW}⚠️  User might already exist (this is OK if testing)${NC}"
else
    echo -e "${RED}❌ Registration failed with status $HTTP_CODE${NC}"
    echo "   Response: $BODY"
fi

echo ""
echo "3️⃣  Testing /auth/login endpoint..."
LOGIN_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -d '{"username":"testuser","password":"testpass123"}')

HTTP_CODE=$(echo "$LOGIN_RESPONSE" | tail -n1)
BODY=$(echo "$LOGIN_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Login works! Got JWT token${NC}"
    echo "   Token preview: $(echo $BODY | cut -c1-50)..."
elif [ "$HTTP_CODE" = "403" ]; then
    echo -e "${RED}❌ Login failed with 403 Forbidden${NC}"
    echo "   This means Spring Security is blocking the request"
    echo "   Check SecurityConfig.java"
else
    echo -e "${RED}❌ Login failed with status $HTTP_CODE${NC}"
    echo "   Response: $BODY"
fi

echo ""
echo "4️⃣  Testing CORS preflight..."
CORS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X OPTIONS http://localhost:8080/api/auth/login \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type")

if [ "$CORS_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ CORS is configured correctly${NC}"
else
    echo -e "${RED}❌ CORS preflight failed with status $CORS_RESPONSE${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "If all tests passed ✅, your frontend should work!"
echo "If any test failed ❌, check:"
echo "  1. Backend is running (./mvnw spring-boot:run)"
echo "  2. SecurityConfig.java has .permitAll() for /api/auth/**"
echo "  3. CORS is configured for http://localhost:5173"
echo ""
echo "Next: Open http://localhost:5173 and try to register/login"
echo ""
