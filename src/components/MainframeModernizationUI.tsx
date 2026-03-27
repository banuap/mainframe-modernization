import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Code2, Workflow, FolderOpen, Github, ArrowLeft, BookOpen, CheckCircle2, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MainframeModernizationUI = () => {
  // ... previous state management code remains the same ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
        {/* Modernized Header */}
        <header className="flex items-center justify-between mb-8 bg-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Workflow className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mainframe Modernization Assistant
              </h1>
              <p className="text-gray-600">Transform legacy code into modern Java applications</p>
            </div>
          </div>
          <Zap className="w-8 h-8 text-yellow-400" />
        </header>

        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* GitHub Repository Input */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <div className="bg-black p-2 rounded">
                <Github className="w-5 h-5 text-white" />
              </div>
              <Input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="Enter GitHub repository URL"
                className="flex-1 border-2 focus:border-blue-500 transition-colors duration-200"
              />
              <Button 
                onClick={() => {/* loadRepository implementation */}}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6"
              >
                {isLoading ? 'Loading...' : 'Load Repository'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          {/* File Browser Panel */}
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2 text-blue-600">
                <FolderOpen className="w-5 h-5" />
                <span>Repository Files</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {/* File browser content with hover effects */}
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center space-x-2 hover:bg-blue-50 transition-colors duration-200"
                >
                  <Code2 className="w-4 h-4 text-blue-500" />
                  <span>sample.cobol</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="col-span-2 space-y-6">
            {/* Source Code Panel */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Code2 className="w-5 h-5" />
                    <span>Source Code {selectedFile ? `- ${selectedFile}` : ''}</span>
                  </div>
                  <Button 
                    onClick={extractBusinessRules}
                    disabled={!sourceCode || isAnalyzing}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Business Rules'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <textarea
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  placeholder={`Enter your ${sourceType.toUpperCase()} code here...`}
                  className="w-full h-64 p-4 font-mono text-sm border-2 rounded-lg focus:border-blue-500 transition-colors duration-200 bg-gray-50"
                  style={{ resize: 'vertical' }}
                />
              </CardContent>
            </Card>

            {/* Business Rules Panel */}
            {businessRules.length > 0 && (
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center space-x-2 text-purple-600">
                    <BookOpen className="w-5 h-5" />
                    <span>Discovered Business Rules</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {businessRules.map(rule => (
                      <div 
                        key={rule.id}
                        className="p-4 border-2 rounded-lg hover:border-blue-300 transition-colors duration-200 cursor-pointer bg-white"
                        onClick={() => toggleRuleSelection(rule.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 
                              className={`w-5 h-5 ${
                                selectedRules.has(rule.id) 
                                  ? 'text-green-500' 
                                  : 'text-gray-300'
                              } transition-colors duration-200`}
                            />
                            <h3 className="font-semibold text-gray-800">{rule.id}: {rule.description}</h3>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            rule.impact === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : rule.impact === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {rule.impact} Impact
                          </span>
                        </div>
                        <div className="mt-3 font-mono text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                          {rule.code}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Dependencies:</span> {rule.dependencies.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Code Panel */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>Generated Java Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Button 
                    onClick={generateJavaCode}
                    disabled={!sourceCode || isGenerating || selectedRules.size === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Java Code'}
                  </Button>
                  <textarea
                    value={generatedCode}
                    readOnly
                    placeholder="Generated Java code will appear here..."
                    className="w-full h-64 p-4 font-mono text-sm border-2 rounded-lg bg-gray-50"
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainframeModernizationUI;