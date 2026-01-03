// Simple calculator with basic safety
function calculate(expression) {
    try {
        // Basic validation - only allow numbers and operators
        if (!/^[0-9+\-*/.() ]+$/.test(expression) || expression.length === 0) {
            return 'Error';
        }
        
        // Check for division by zero
        if (expression.includes('/0') || expression.match(/\/\s*0/)) {
            return 'Error';
        }
        
        // Use Function constructor with validation (safer than eval)
        // This creates a new function that only evaluates the expression
        const result = new Function('return (' + expression + ')')();
        
        // Check if result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            return 'Error';
        }
        
        // Format to prevent long decimal issues
        return parseFloat(result.toFixed(10)).toString();
    } catch (error) {
        return 'Error';
    }
}

// Handle button clicks
function handleButtonClick(value) {
    const display = document.calc.txt;
    
    if(value === '=') {
        // Calculate the result
        const result = calculate(display.value);
        display.value = result;
    } else if(value === 'C') {
        // Clear the display
        display.value = '';
    } else {
        // Append the value to the display
        display.value += value;
    }
}