#!/bin/bash

echo "🤖 Claude Code Setup Helper"
echo "=========================="

# Check if API key is already set
if [ -n "$ANTHROPIC_API_KEY" ]; then
    echo "✅ ANTHROPIC_API_KEY environment variable is set"
else
    echo "❌ ANTHROPIC_API_KEY environment variable not found"
    echo ""
    echo "To set your API key:"
    echo "1. Get your API key from: https://console.anthropic.com/"
    echo "2. Run: export ANTHROPIC_API_KEY=your_api_key_here"
    echo "3. Or add it to your ~/.zshrc or ~/.bashrc:"
    echo "   echo 'export ANTHROPIC_API_KEY=your_api_key_here' >> ~/.zshrc"
    echo ""
    read -p "Do you have your Anthropic API key ready? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your Anthropic API key: " api_key
        export ANTHROPIC_API_KEY="$api_key"
        echo "✅ API key set for this session"
    fi
fi

echo ""
echo "🧪 Testing Claude Code..."
npx claude --version

echo ""
echo "💡 Usage Examples:"
echo "• npx claude 'Help me debug this JavaScript code'"
echo "• npx claude --model claude-3-5-sonnet 'Explain this React component'"
echo "• npx claude --max-tokens 1000 'Write a Python function'"
echo ""
echo "🎯 Claude Code is ready to use!"
