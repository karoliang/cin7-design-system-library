#!/bin/bash

echo "=== Storybook Local Testing Report ==="
echo "Testing URL: http://localhost:6007"
echo "Date: $(date)"
echo ""

# Test the main Storybook page
echo "1. Testing main Storybook page..."
MAIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:6007)
echo "Main page HTTP status: $MAIN_STATUS"

if [ "$MAIN_STATUS" = "200" ]; then
    echo "✅ Main Storybook page loads successfully"
else
    echo "❌ Main Storybook page failed to load"
fi

echo ""

# Function to test a specific URL
test_storybook_url() {
    local url="$1"
    local name="$2"

    echo "Testing: $name"
    echo "URL: $url"

    # Get HTTP status
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    echo "HTTP Status: $HTTP_STATUS"

    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ Page loads successfully"

        # Check for error content
        PAGE_CONTENT=$(curl -s "$url")

        # Look for common error indicators
        if echo "$PAGE_CONTENT" | grep -q "No Preview"; then
            echo "❌ Contains 'No Preview' message"
        else
            echo "✅ No 'No Preview' message found"
        fi

        if echo "$PAGE_CONTENT" | grep -q "error\|Error\|exception\|Exception"; then
            echo "⚠️ May contain error messages"
        else
            echo "✅ No obvious error messages"
        fi

        # Check for Storybook content
        if echo "$PAGE_CONTENT" | grep -q "storybook\|Storybook"; then
            echo "✅ Contains Storybook content"
        else
            echo "❌ Does not appear to be valid Storybook content"
        fi
    else
        echo "❌ Failed to load (HTTP $HTTP_STATUS)"
    fi

    echo "----------------------------------------"
    echo ""
}

# Test failing production pages
echo "2. Testing pages that fail in production..."
echo ""

test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-ui-patterns-usage-patterns--docs" "UI Patterns - Usage Patterns"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-enterprise-components-extjs-advanced-forms--docs" "ExtJS - Advanced Forms (Docs)"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-enterprise-components-extjs-chart-integration--docs" "ExtJS - Chart Integration"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-enterprise-components-extjs-form-panel--docs" "ExtJS - Form Panel"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-enterprise-components-extjs-tree-panel--docs" "ExtJS - Tree Panel"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-data-visualization-area-chart--docs" "Area Chart (Docs)"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-business-patterns-vanilla-js-dom-utilities--docs" "Vanilla JS - DOM Utilities"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-theming-documentation--docs" "Theming Documentation"
test_storybook_url "http://localhost:6007/?path=/docs/cin7-dsl-theming-theme-playground--docs" "Theme Playground (Docs)"

# Test known working stories
echo "3. Testing stories that should work..."
echo ""

test_storybook_url "http://localhost:6007/?path=/story/cin7-dsl-enterprise-components-extjs-advanced-forms--multi-step-wizard" "ExtJS - Multi-Step Wizard"
test_storybook_url "http://localhost:6007/?path=/story/cin7-dsl-theming-theme-playground--playground" "Theme Playground (Story)"
test_storybook_url "http://localhost:6007/?path=/story/cin7-dsl-charts-linechart--default" "LineChart - Default"
test_storybook_url "http://localhost:6007/?path=/story/cin7-dsl-charts-barchart--default" "BarChart - Default"
test_storybook_url "http://localhost:6007/?path=/story/cin7-dsl-charts-piechart--default" "PieChart - Default"

echo "=== Test Complete ==="