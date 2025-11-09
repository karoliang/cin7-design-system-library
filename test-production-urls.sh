#!/bin/bash

echo "=== Production Storybook Testing Report ==="
echo "Testing URL: https://cin7-dsl.netlify.app/storybook/"
echo "Date: $(date)"
echo ""

# Function to test a specific production URL
test_production_url() {
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

# Test the same URLs that fail in production
echo "Testing production URLs that show 'No Preview' errors..."
echo ""

test_production_url "https://cin7-dsl.netlify.app/storybook/?path=/docs/cin7-dsl-ui-patterns-usage-patterns--docs" "UI Patterns - Usage Patterns (Production)"
test_production_url "https://cin7-dsl.netlify.app/storybook/?path=/docs/cin7-dsl-enterprise-components-extjs-advanced-forms--docs" "ExtJS - Advanced Forms (Production)"
test_production_url "https://cin7-dsl.netlify.app/storybook/?path=/docs/cin7-dsl-enterprise-components-extjs-chart-integration--docs" "ExtJS - Chart Integration (Production)"
test_production_url "https://cin7-dsl.netlify.app/storybook/?path=/story/cin7-dsl-charts-linechart--default" "LineChart (Production)"
test_production_url "https://cin7-dsl.netlify.app/storybook/?path=/story/cin7-dsl-charts-barchart--default" "BarChart (Production)"
test_production_url "https://cin7-dsl.netlify.app/storybook/?path=/story/cin7-dsl-charts-piechart--default" "PieChart (Production)"

echo "=== Production Test Complete ==="