import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area 
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, ShoppingCart, MessageSquare, Users, BrainCircuit, Globe, Database, Play, RefreshCw, Layers, Cpu, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [predictions, setPredictions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataRes, predRes] = await Promise.all([
          fetch('/api/data'),
          fetch('/api/predict')
        ]);
        const dataJson = await dataRes.json();
        const predJson = await predRes.json();
        setData(dataJson);
        setPredictions(predJson.predictions);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTrain = async () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 2000);
  };

  if (loading) return <div className="p-8 text-egypt-gold animate-pulse font-egypt text-2xl italic">Awakening the Great Library of Analytics...</div>;

  const combinedData = [...data.history, ...predictions];
  const lastHistory = data.history[data.history.length - 1];
  const lastForecast = predictions[predictions.length - 1];
  const inflationChange = ((lastForecast.cpi - lastHistory.cpi) / lastHistory.cpi * 100).toFixed(2);

  return (
    <div className="p-2 space-y-2 max-w-6xl mx-auto bg-egypt-basalt min-h-screen text-egypt-sand selection:bg-egypt-gold selection:text-egypt-basalt egypt-bg overflow-x-hidden">
      {/* HEADER - EGYPTIAN MONUMENTAL STYLE */}
      <header className="relative z-20 flex justify-between items-center pb-2 border-b border-egypt-gold/40 bg-egypt-basalt/90 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 bg-egypt-gold rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] rotate-45 border border-egypt-basalt">
              <TrendingUp className="text-egypt-basalt w-6 h-6 -rotate-45" />
            </div>
            <div className="absolute -inset-1 border border-egypt-gold/20 rounded-sm rotate-45 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-widest text-egypt-gold uppercase leading-none">EREN YEAGER ETERNALS</h1>
              <div className="flex gap-0.5">
                <div className="w-0.5 h-2 bg-egypt-gold/40 rotate-12" />
                <div className="w-0.5 h-2 bg-egypt-lapis/40 -rotate-12" />
              </div>
            </div>
            <p className="text-[5px] text-egypt-gold/60 uppercase tracking-[0.4em] font-bold mt-1 font-sans">MACROECONOMIC FLOWS • TACTICAL COMMAND • DYNASTY-ID: 842-X</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-4 font-sans">
            <div className="text-right">
              <p className="text-[5px] text-egypt-gold/40 uppercase font-bold tracking-widest">Oracle Latency</p>
              <p className="text-[8px] font-bold text-egypt-turquoise uppercase">XIV ms</p>
            </div>
            <div className="text-right">
              <p className="text-[5px] text-egypt-gold/40 uppercase font-bold tracking-widest">Flow Rate</p>
              <p className="text-[8px] font-bold text-egypt-lapis uppercase">I.II GB/s</p>
            </div>
          </div>
          <Button size="sm" onClick={handleTrain} disabled={isTraining} className="h-8 text-[9px] font-bold uppercase tracking-[0.2em] bg-egypt-gold hover:bg-egypt-gold/80 text-egypt-basalt border-none px-4 rounded-none shadow-[2px_2px_0_rgba(212,175,55,0.2)] transition-all transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
            {isTraining ? <RefreshCw className="w-3 h-3 animate-spin mr-2" /> : <Play className="w-3 h-3 mr-2" />}
            INVOKE
          </Button>
        </div>
      </header>

      {/* UNIFIED DASHBOARD GRID */}
      <div className="grid grid-cols-12 gap-3 relative z-10">
        
        {/* TOP ROW: CORE METRICS */}
        <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard 
            title="6M CPI PROJECTION" 
            value={lastForecast.cpi} 
            change={`${inflationChange}%`} 
            isUp={parseFloat(inflationChange) > 0}
            icon={Activity}
            color="gold"
          />
          <MetricCard 
            title="E-COMM PRICE INDEX" 
            value={lastHistory.priceIndex} 
            label="XII.IV M Products"
            icon={ShoppingCart}
            color="blue"
          />
          <MetricCard 
            title="SOCIAL SENTIMENT" 
            value={(lastHistory.sentiment * 100).toFixed(1) + "%"} 
            label="Public Confidence"
            icon={MessageSquare}
            color="white"
          />
          <MetricCard 
            title="WAGE GROWTH VELOCITY" 
            value={(lastHistory.wageGrowth * 100).toFixed(2) + "%"} 
            label="Labor Force Pressure"
            icon={Users}
            color="purple"
          />
        </div>

        {/* MIDDLE ROW: FORECAST & ANALYTICS */}
        <div className="col-span-12 lg:col-span-8 space-y-2">
          <Card className="bg-egypt-basalt/60 border border-egypt-gold/20 rounded-none shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-egypt-gold/5 rounded-full -mr-12 -mt-12 blur-2xl" />
            <CardHeader className="py-2 px-4 border-b border-egypt-gold/10 bg-egypt-gold/5">
              <CardTitle className="text-[5px] font-bold uppercase tracking-[0.3em] text-egypt-gold/80">Temporal Convergence Forecast</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={combinedData}>
                    <defs>
                      <linearGradient id="colorEgypt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(212,175,55,0.05)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#D4AF37', fontSize: 5, fontFamily: 'Cormorant Garamond', fontWeight: 600}} dy={5} />
                    <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#D4AF37', fontSize: 5, fontFamily: 'Cormorant Garamond', fontWeight: 600}} />
                    <Tooltip contentStyle={{ backgroundColor: '#0D0D0D', border: '1px solid #D4AF37', fontSize: '5px', fontFamily: 'Cormorant Garamond' }} />
                    <Area type="monotone" dataKey="cpi" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorEgypt)" dot={false} />
                    <Area type="stepAfter" dataKey="wageGrowth" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card className="bg-egypt-basalt/60 border border-egypt-gold/10 rounded-none">
              <CardHeader className="py-2 px-4 border-b border-egypt-gold/10">
                <CardTitle className="text-[5px] font-bold uppercase tracking-[0.2em] text-egypt-gold/80">Sentiment vs Price Correlation</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.history}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(212,175,55,0.03)" />
                      <XAxis dataKey="date" hide />
                      <YAxis yAxisId="left" hide />
                      <YAxis yAxisId="right" orientation="right" hide />
                      <Line yAxisId="left" type="monotone" dataKey="priceIndex" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      <Line yAxisId="right" type="monotone" dataKey="sentiment" stroke="#ffffff" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-egypt-basalt/60 border border-egypt-gold/10 rounded-none">
              <CardHeader className="py-2 px-4 border-b border-egypt-gold/10">
                <CardTitle className="text-[5px] font-bold uppercase tracking-[0.2em] text-egypt-gold/80">Historical Distortion Ledger</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {data.history.slice(-4).reverse().map((row: any) => (
                      <TableRow key={row.date} className="border-egypt-gold/5 h-8 hover:bg-egypt-gold/5 transition-colors">
                        <TableCell className="text-[5px] py-0.5 px-4 font-sans font-bold text-egypt-gold/60">{row.date}</TableCell>
                        <TableCell className="text-sm py-0.5 px-2 font-bold text-egypt-sand">{row.cpi}</TableCell>
                        <TableCell className="text-sm py-0.5 px-4 text-right">
                          <span className={cn("px-1.5 py-0.5 rounded-none text-[5px] font-bold border", row.sentiment > 0.5 ? "bg-egypt-turquoise/10 text-egypt-turquoise border-egypt-turquoise/20" : "bg-red-900/10 text-red-500 border-red-900/20")}>
                            {row.sentiment.toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT COLUMN: ENGINE & SOURCES */}
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <Card className="border border-egypt-gold/30 bg-egypt-basalt shadow-xl rounded-none relative">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-egypt-gold" />
            <CardHeader className="py-2 px-4 border-b border-egypt-gold/10 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-egypt-gold">Engine Analytics</CardTitle>
              <BrainCircuit className="w-4 h-4 text-egypt-gold" />
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-egypt-lapis/5 border border-egypt-lapis/10 relative">
                  <p className="text-[5px] text-egypt-lapis/60 uppercase font-bold font-sans">XGBoost Sync</p>
                  <p className="text-sm font-bold text-egypt-lapis">XCII.IV%</p>
                </div>
                <div className="p-2 bg-egypt-gold/5 border border-egypt-gold/10 relative">
                  <p className="text-[5px] text-egypt-gold/60 uppercase font-bold font-sans">LSTM Lock</p>
                  <p className="text-sm font-bold text-egypt-gold">XCV.I%</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-1">
                <h4 className="text-[6px] font-bold uppercase text-egypt-gold tracking-[0.2em]">Feature Weights</h4>
                <div className="space-y-3">
                  <FeatureItem label="E-comm Index" value={45} color="bg-blue-500" />
                  <FeatureItem label="Wage Growth" value={30} color="bg-purple-500" />
                  <FeatureItem label="Sentiment" value={15} color="bg-white" />
                  <FeatureItem label="Historical Lag" value={10} color="bg-zinc-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-egypt-gold/10">
                <div className="p-2 bg-egypt-gold/5 rounded-none border border-egypt-gold/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-3 h-3 text-egypt-turquoise" />
                    <span className="text-[5px] font-bold uppercase text-egypt-gold/60 tracking-widest">E-Comm</span>
                  </div>
                  <p className="text-xs font-bold text-egypt-gold">XII.IV M</p>
                </div>
                <div className="p-2 bg-egypt-gold/5 rounded-none border border-egypt-gold/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-3 h-3 text-egypt-lapis" />
                    <span className="text-[5px] font-bold uppercase text-egypt-gold/60 tracking-widest">Labor</span>
                  </div>
                  <p className="text-xs font-bold text-egypt-gold">IV.II M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-egypt-gold/10 bg-egypt-basalt rounded-none">
            <CardHeader className="py-2 px-4 border-b border-egypt-gold/10 flex flex-row items-center justify-between">
              <CardTitle className="text-[5px] font-bold uppercase tracking-[0.3em] text-egypt-gold/80">Tactical Command Log</CardTitle>
              <Zap className="w-2.5 h-2.5 text-egypt-turquoise animate-pulse" />
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-start gap-2 border-l border-egypt-gold/20 pl-2">
                <div className="text-[5px] font-sans font-bold text-egypt-gold/40 mt-0.5">09:46</div>
                <p className="text-[6px] font-bold text-egypt-sand leading-tight uppercase tracking-wider">
                  Protocol "Freedom" initiated.
                </p>
              </div>
              <div className="flex items-start gap-2 border-l border-egypt-lapis/20 pl-2">
                <div className="text-[5px] font-sans font-bold text-egypt-lapis/40 mt-0.5">09:42</div>
                <p className="text-[6px] font-bold text-egypt-sand/60 leading-tight uppercase tracking-wider">
                  XGBoost sync confirmed.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-egypt-gold/10 bg-egypt-basalt rounded-none">
            <CardHeader className="py-2 px-4 border-b border-egypt-gold/10">
              <CardTitle className="text-[5px] font-bold uppercase tracking-[0.3em] text-egypt-gold/80">The Eternal Scroll</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-egypt-gold/10 h-6">
                    <TableHead className="text-[5px] font-bold uppercase h-6 px-4 text-egypt-gold/40">Date</TableHead>
                    <TableHead className="text-[5px] font-bold uppercase h-6 px-2 text-egypt-gold/40">CPI</TableHead>
                    <TableHead className="text-[5px] font-bold uppercase h-6 px-2 text-egypt-gold/40 text-right pr-4">Sent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.history.slice(-6).reverse().map((row: any) => (
                    <TableRow key={row.date} className="border-egypt-gold/5 h-6 hover:bg-egypt-gold/5 transition-colors">
                      <TableCell className="text-[5px] py-0.5 px-4 font-sans font-bold text-egypt-gold/60">{row.date}</TableCell>
                      <TableCell className="text-sm py-0.5 px-2 font-bold text-egypt-sand">{row.cpi}</TableCell>
                      <TableCell className="text-sm py-0.5 px-2 text-right pr-4">
                        <span className={cn("font-bold", row.sentiment > 0.5 ? "text-egypt-turquoise/80" : "text-red-900")}>
                          {row.sentiment.toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FOOTER - EGYPTIAN SYSTEMS */}
      <footer className="pt-3 border-t border-egypt-gold/20 flex justify-between items-center relative z-20">
        <div className="flex gap-4 text-[5px] font-bold text-egypt-gold/50 uppercase tracking-[0.3em]">
          <span className="flex items-center gap-1"><div className="w-1 h-1 bg-egypt-gold rotate-45" /> Eternal Sync Active</span>
          <span className="flex items-center gap-1"><div className="w-1 h-1 bg-egypt-turquoise rotate-45" /> Reality: Stabilized</span>
        </div>
        <p className="text-[5px] font-sans font-bold text-egypt-gold/30 tracking-widest uppercase">© MMXXVI INFLATIONPULSE SYSTEMS</p>
      </footer>
    </div>
  );
}

function MetricCard({ title, value, change, label, isUp, icon: Icon, color }: any) {
  const colorClasses: any = {
    gold: "bg-egypt-gold/10 text-egypt-gold border-egypt-gold/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    white: "bg-white/10 text-white border-white/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  return (
    <Card className={cn("border bg-egypt-basalt/80 backdrop-blur-md rounded-none relative overflow-hidden group transition-all hover:border-current", colorClasses[color])}>
      <CardContent className="p-2">
        <div className="flex justify-between items-start">
          <div className={cn("p-1 border transition-transform group-hover:scale-110", colorClasses[color])}>
            <Icon className="w-3 h-3" />
          </div>
          {change && (
            <div className={cn(
              "flex items-center gap-0.5 text-[6px] font-bold px-1 py-0.5 border",
              isUp ? "bg-red-900/20 text-red-500 border-red-900/30" : "bg-egypt-turquoise/20 text-egypt-turquoise border-egypt-turquoise/30"
            )}>
              {isUp ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />}
              {change}
            </div>
          )}
        </div>
        <div className="mt-2">
          <p className="text-[5px] font-bold uppercase tracking-[0.3em] opacity-50 leading-none">{title}</p>
          <h3 className="text-sm font-bold text-egypt-sand mt-1 tracking-tighter leading-none">{value}</h3>
          {label && <p className="text-[5px] uppercase tracking-[0.2em] opacity-30 mt-1 font-bold">{label}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ label, value, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[5px] font-sans font-bold uppercase tracking-widest">
        <span className="text-egypt-gold/40">{label}</span>
        <span className="text-egypt-gold/80">{value}%</span>
      </div>
      <div className="h-0.5 w-full bg-egypt-gold/10 rounded-none overflow-hidden border border-egypt-gold/20">
        <div className={cn("h-full shadow-[0_0_5px_rgba(212,175,55,0.3)]", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
