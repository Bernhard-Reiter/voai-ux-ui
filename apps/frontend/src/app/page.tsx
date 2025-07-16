"use client";

import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, CommandPalette } from "@voai/ui";
import { useState } from "react";

const commandItems = [
  {
    id: "new-negotiation",
    title: "New Negotiation",
    description: "Start a new AI-powered negotiation",
    icon: "📝",
    action: () => console.log("New negotiation"),
    keywords: ["create", "start"],
  },
  {
    id: "view-dashboard",
    title: "View Dashboard",
    description: "Open your negotiation dashboard",
    icon: "📊",
    action: () => console.log("View dashboard"),
    keywords: ["home", "overview"],
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure your preferences",
    icon: "⚙️",
    action: () => console.log("Open settings"),
    keywords: ["config", "preferences"],
  },
  {
    id: "help",
    title: "Help & Documentation",
    description: "Get help and view documentation",
    icon: "📚",
    action: () => console.log("Open help"),
    keywords: ["docs", "support"],
  },
];

export default function Home() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  return (
    <main className="min-h-screen p-8">
      {/* Command Palette */}
      {showCommandPalette && (
        <CommandPalette
          items={commandItems}
          placeholder="What would you like to do?"
        />
      )}

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold font-serif">
            Welcome to voai
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Negotiation Platform
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Press{" "}
            <kbd className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
              ⌘K
            </kbd>{" "}
            to open command palette
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Smart Negotiations</CardTitle>
                <Badge variant="success">Active</Badge>
              </div>
              <CardDescription>
                AI-driven insights for better outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Leverage artificial intelligence to analyze negotiation patterns
                and suggest optimal strategies.
              </p>
              <Button size="sm" variant="primary">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Document Analysis</CardTitle>
                <Badge variant="warning">Beta</Badge>
              </div>
              <CardDescription>
                Extract key terms automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Upload contracts and documents to automatically identify
                critical terms and clauses.
              </p>
              <Button size="sm" variant="secondary">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Collaboration</CardTitle>
                <Badge>New</Badge>
              </div>
              <CardDescription>
                Work together seamlessly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Collaborate with your team in real-time with shared workspaces
                and communication tools.
              </p>
              <Button size="sm" variant="ghost">
                Explore
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={() => setShowCommandPalette(true)}
          >
            Open Command Palette
          </Button>
          <Button size="lg" variant="secondary">
            View Documentation
          </Button>
        </div>
      </div>
    </main>
  );
}