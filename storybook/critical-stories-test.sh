#!/bin/bash

# Storybook Critical Stories Regression Test
# Tests the most important stories for basic functionality

echo "🚀 Starting Storybook Critical Stories Regression Test"
echo "=================================================="
echo "Testing URL: http://localhost:6006"
echo "Timestamp: $(date)"
echo ""

# Function to test a story URL
test_story() {
    local story_name="$1"
    local story_url="$2"

    echo "🔍 Testing: $story_name"
    echo "   URL: $story_url"

    # Time the request
    local start_time=$(date +%s%3N)

    # Make the request and capture status and content
    local response=$(curl -s -w "HTTPSTATUS:%{http_code};TIME:%{time_total};SIZE:%{size_download}" "$story_url")
    local http_code=$(echo "$response" | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
    local time_total=$(echo "$response" | grep -o "TIME:[0-9.]*" | cut -d: -f2)
    local size_download=$(echo "$response" | grep -o "SIZE:[0-9]*" | cut -d: -f2)
    local content=$(echo "$response" | sed 's/HTTPSTATUS:[0-9]*;TIME:[0-9.]*;SIZE:[0-9]*//')

    local end_time=$(date +%s%3N)
    local load_time=$((end_time - start_time))

    # Check results
    if [ "$http_code" = "200" ]; then
        if (( $(echo "$time_total < 5.0" | bc -l) )); then
            echo "   ✅ SUCCESS (${time_total}s, ${size_download} bytes)"

            # Check for common error patterns in content
            if echo "$content" | grep -qi "error\|exception\|failed\|undefined\|null"; then
                echo "   ⚠️  Possible errors in content"
            fi

            # Check if story content is present
            if echo "$content" | grep -qi "storybook-root\|story.*element\|canvas"; then
                echo "   ✅ Story content detected"
            else
                echo "   ❌ No story content detected"
            fi

        else
            echo "   ⚠️  SLOW (${time_total}s)"
        fi
    else
        echo "   ❌ FAILED (HTTP $http_code)"
    fi

    echo ""
}

# Function to test Storybook health
check_storybook_health() {
    echo "🏥 Checking Storybook Health..."

    local health_response=$(curl -s -w "HTTPSTATUS:%{http_code}" "http://localhost:6006")
    local health_code=$(echo "$health_response" | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)

    if [ "$health_code" = "200" ]; then
        echo "✅ Storybook is healthy and responding"

        # Check if it's actually Storybook
        if echo "$health_response" | grep -qi "storybook\|react\|vite"; then
            echo "✅ Storybook application detected"
        else
            echo "⚠️  Unexpected response - may not be Storybook"
        fi
    else
        echo "❌ Storybook is not responding (HTTP $health_code)"
        exit 1
    fi
    echo ""
}

# Check if Storybook is running
check_storybook_health

# Critical Stories to Test
echo "📋 Testing Critical Stories"
echo "========================"

# Form Components
echo "🔧 FORM COMPONENTS"
echo "------------------"
test_story "Button - Primary" "http://localhost:6006/?path=/story/polaris-components-button--primary-button"
test_story "TextField" "http://localhost:6006/?path=/story/polaris-components-textfield--text-field"
test_story "Checkbox" "http://localhost:6006/?path=/story/polaris-components-checkbox--checkbox"
test_story "Select" "http://localhost:6006/?path=/story/polaris-components-select--select"
test_story "RadioButton" "http://localhost:6006/?path=/story/polaris-components-radiobutton--radio-button"

# Layout Components
echo "📐 LAYOUT COMPONENTS"
echo "-------------------"
test_story "Card" "http://localhost:6006/?path=/story/polaris-components-card--card"
test_story "Grid" "http://localhost:6006/?path=/story/polaris-components-grid--grid"
test_story "BlockStack" "http://localhost:6006/?path=/story/polaris-components-blockstack--default"
test_story "VerticalStack" "http://localhost:6006/?path=/story/polaris-components-verticalstack--default"

# Interactive Components
echo "🎯 INTERACTIVE COMPONENTS"
echo "------------------------"
test_story "Modal" "http://localhost:6006/?path=/story/polaris-components-modal--default"
test_story "Popover" "http://localhost:6006/?path=/story/polaris-components-popover--default"
test_story "Tooltip" "http://localhost:6006/?path=/story/polaris-components-tooltip--default"
test_story "Toast" "http://localhost:6006/?path=/story/polaris-components-toast--default"

# Navigation Components
echo "🧭 NAVIGATION COMPONENTS"
echo "-----------------------"
test_story "Navigation" "http://localhost:6006/?path=/story/polaris-components-navigation--default"
test_story "Tabs" "http://localhost:6006/?path=/story/polaris-components-tabs--default"
test_story "Breadcrumbs" "http://localhost:6006/?path=/story/polaris-components-breadcrumbs--default"

# Data Display Components
echo "📊 DATA DISPLAY COMPONENTS"
echo "-------------------------"
test_story "DataTable" "http://localhost:6006/?path=/story/polaris-components-datatable--default"
test_story "ResourceList" "http://localhost:6006/?path=/story/polaris-components-resourcelist--default"

# Foundation Components
echo "🏗️  FOUNDATION COMPONENTS"
echo "------------------------"
test_story "Design Tokens" "http://localhost:6006/?path=/story/foundation-components-design-tokens--design-tokens"
test_story "Core Utilities" "http://localhost:6006/?path=/story/foundation-components-coreutilities--core-utilities"

# Guide Stories
echo "📖 GUIDE STORIES"
echo "---------------"
test_story "Getting Started" "http://localhost:6006/?path=/story/guides-getting-started--getting-started"
test_story "Component Categories" "http://localhost:6006/?path=/story/guides-component-categories--component-categories"
test_story "DSL Architecture" "http://localhost:6006/?path=/story/guides-dslarchitecture--dsl-architecture"

# Feedback Components
echo "💬 FEEDBACK COMPONENTS"
echo "---------------------"
test_story "Badge" "http://localhost:6006/?path=/story/polaris-components-badge--badge"
test_story "Banner" "http://localhost:6006/?path=/story/polaris-components-banner--banner"
test_story "EmptyState" "http://localhost:6006/?path=/story/polaris-components-emptystate--empty-state"

echo "🏁 Critical Stories Testing Complete"
echo "=================================="
echo "Next Steps:"
echo "1. Review any failed or slow-loading stories above"
echo "2. Open http://localhost:6006 in browser with DevTools"
echo "3. Manually test interactive elements (buttons, forms, dropdowns)"
echo "4. Check console for JavaScript errors and warnings"
echo "5. Test remaining 80+ stories using the manual testing guide"
echo ""
echo "Full manual testing guide available in: manual-test-guide.md"