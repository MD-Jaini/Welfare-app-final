import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function WelfareApp() {
  const [language, setLanguage] = useState("en");
  const [auth, setAuth] = useState({ role: "guest", isLoggedIn: false });
  const [formData, setFormData] = useState({ state: "", district: "" });

  const handleLogin = (role) => {
    setAuth({ role, isLoggedIn: true });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between mb-4">
        <Button variant="outline" onClick={() => setLanguage(language === "en" ? "te" : "en")}>
          {language === "en" ? "Switch to Telugu" : "Switch to English"}
        </Button>
        {!auth.isLoggedIn && (
          <div className="space-x-2">
            <Button onClick={() => handleLogin("lmf")}>Login as LMF</Button>
            <Button onClick={() => handleLogin("mla")}>Login as MLA</Button>
            <Button onClick={() => handleLogin("admin")}>Login as Admin</Button>
          </div>
        )}
      </div>

      {auth.isLoggedIn ? (
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="form">Demographic</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card>
              <CardContent className="space-y-4 p-4">
                <Input placeholder="State" name="state" onChange={handleChange} />
                <Input placeholder="District" name="district" onChange={handleChange} />
                <Input placeholder="Constituency" name="constituency" onChange={handleChange} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard">
            <Card>
              <CardContent className="p-4">
                <p className="text-lg font-bold mb-2">Dashboard (Role: {auth.role})</p>
                <p>Status indicators, charts, and heatmaps will be shown here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card>
              <CardContent className="p-4">
                <p className="font-medium">Export your data as CSV, Excel or PDF (coming soon).</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-4">
            <p>Please login to access app features.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}