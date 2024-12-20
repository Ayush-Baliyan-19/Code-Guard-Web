'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function ProjectConfig() {
  const { id } = useParams()
  const {data} =  useSession()
  const [config, setConfig] = useState({
    name: '',
    enableLinting: true,
    enableFormatting: true,
    tabSize: 2,
    maxLineLength: 80,
    enableSecurityChecks: true,
    enablePerformanceChecks: false,
    jsdoc: true,
    eqeqeq: true,
    indent: 2,
    noConsole: true,
    noUnusedVars: true,
    quotes: 'single',
  })

  type ConfigKeys = 'enableLinting' | 'enableFormatting' | 'tabSize' | 'maxLineLength' | 'enableSecurityChecks' | 'enablePerformanceChecks' | 'jsdoc' | 'eqeqeq' | 'indent' | 'noConsole' | 'noUnusedVars' | 'quotes';

  const handleSwitchChange = (name: ConfigKeys) => {
    setConfig((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setConfig((prev) => ({ ...prev, [name]: name === 'quotes' || name === 'name' ? value : parseInt(value, 10) }))
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        // Here you would typically send the config to your backend
        // Generate and display the configuration key
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/addProject`, { userId: data?.user?.name, project: config })
        alert(`Configuration saved successfully. Your configuration key is: ${response.data.projectId}`)
        window.location.href = '/projects'
    } catch (error) {
        console.error('Error saving configuration:', error)
        alert('Failed to save configuration. Please try again.')
    }
}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Project {id}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={config.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="enableLinting">Enable Linting</Label>
            <Switch
              id="enableLinting"
              checked={config.enableLinting}
              onCheckedChange={() => handleSwitchChange('enableLinting')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="enableForyarn matting">Enable Formatting</Label>
            <Switch
              id="enableFormatting"
              checked={config.enableFormatting}
              onCheckedChange={() => handleSwitchChange('enableFormatting')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxLineLength">Max Line Length</Label>
            <Input
              id="maxLineLength"
              name="maxLineLength"
              type="number"
              value={config.maxLineLength}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="jsdoc">JSDoc</Label>
            <Switch
              id="jsdoc"
              checked={config.jsdoc}
              onCheckedChange={() => handleSwitchChange('jsdoc')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="eqeqeq">Eqeqeq</Label>
            <Switch
              id="eqeqeq"
              checked={config.eqeqeq}
              onCheckedChange={() => handleSwitchChange('eqeqeq')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="indent">Indent</Label>
            <Input
              id="indent"
              name="indent"
              type="number"
              value={config.indent}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="noConsole">No Console</Label>
            <Switch
              id="noConsole"
              checked={config.noConsole}
              onCheckedChange={() => handleSwitchChange('noConsole')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="noUnusedVars">No Unused Vars</Label>
            <Switch
              id="noUnusedVars"
              checked={config.noUnusedVars}
              onCheckedChange={() => handleSwitchChange('noUnusedVars')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quotes">Quotes</Label>
            <Input
              id="quotes"
              name="quotes"
              type="text"
              value={config.quotes}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit}>Save Configuration</Button>
      </CardFooter>
    </Card>
  )
}