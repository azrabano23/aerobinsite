import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { MapView } from '../components/map/MapView'
import { EnhancedMapView } from '../components/map/EnhancedMapView'
import { LivePeek } from '../components/common/LivePeek'
import { CostComparison } from '../components/financial/CostComparison'
import { CitywideDeployment } from '../components/vision/CitywideDeployment'
import { SmartCityCoalition } from '../components/vision/SmartCityCoalition'
import { useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin, Zap, Sparkles } from 'lucide-react'
import columbiaLogo from '../assets/icons/columbia.png'
import rutgersLogo from '../assets/icons/rutgers.png'
import nsfLogo from '../assets/icons/NSF.png'
import launchCircuitLogo from '../assets/icons/launchcircuit.png'
import logoImage from '../assets/icons/logo.png'

export function Landing() {
  const navigate = useNavigate()
  const { bins } = useAppStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-950/20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center container mx-auto px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[80px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-4xl mx-auto space-y-4"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-2"
          >
            <div className="relative">
              <img 
                src={logoImage} 
                alt="AeroBin Logo" 
                className="h-24 md:h-32 lg:h-36 w-auto object-contain"
              />
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl -z-10"></div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs md:text-sm font-medium text-emerald-400/90 tracking-wide">Smart Waste Management Platform</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] mb-3"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <div className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Transform Waste
            </div>
            <div className="text-foreground">Into Intelligence</div>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 max-w-2xl mx-auto mb-4"
          >
            <p className="text-base md:text-lg text-muted-foreground/90 leading-relaxed font-light">
              Real-time bin monitoring, AI-optimized routes, and actionable insights to reduce costs
              and environmental impact.
            </p>
            <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed font-light">
              Join leading universities and cities in revolutionizing waste collection with smart sensors
              and data-driven optimization.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center pt-2"
          >
            <Button
              onClick={() => navigate('/dashboard')}
              className="group text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 font-medium rounded-md"
            >
              Open Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            How it Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-base md:text-lg">Three simple steps to transform your waste management</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Clip-on Sensor',
                description: 'Easy installation on any bin. Ultrasonic sensors measure fill level in real-time with 99% accuracy.',
                icon: <Zap className="h-6 w-6" />,
                gradient: 'from-emerald-500/20 to-emerald-500/5',
              },
              {
                step: '02',
                title: 'Real-time Data',
                description: 'Continuous monitoring with battery-powered sensors. Data syncs every minute via cellular connectivity.',
                icon: <MapPin className="h-6 w-6" />,
                gradient: 'from-primary/20 to-primary/5',
              },
              {
                step: '03',
                title: 'Smart Routes',
                description: 'AI optimizes collection routes to reduce trips, fuel, and labor costs by up to 40%.',
                icon: <ArrowRight className="h-6 w-6" />,
                gradient: 'from-emerald-500/20 to-emerald-500/5',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <Card className="h-full border-2 hover:border-emerald-500/50 transition-all duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} text-emerald-400 shadow-md`}>
                        {item.icon}
                      </div>
                      <div className="text-5xl font-extrabold text-muted-foreground/10 leading-none">{item.step}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Proven Results
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-base md:text-lg">Leading institutions trust AeroBin for smarter waste management</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-bold">Live Pilot — Columbia University</CardTitle>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-56 rounded-lg overflow-hidden border border-border/50 shadow-inner relative">
                    <EnhancedMapView
                      bins={bins.filter((b) => b.organization === 'Columbia University')}
                      center={[40.8075, -73.9626]}
                      zoom={15}
                      showPilotDetails={true}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-extrabold text-emerald-400">32%</div>
                    <div className="text-sm text-muted-foreground">fewer pickups</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    40 bins deployed across Morningside Heights campus. Real-time monitoring enabled
                    optimized collection schedules, reducing operational costs by $45K annually.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-bold">Pilot Launching — Rutgers University</CardTitle>
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-56 rounded-lg overflow-hidden border border-border/50 shadow-inner relative">
                    <EnhancedMapView
                      bins={bins.filter((b) => b.organization === 'Rutgers University')}
                      center={[40.522, -74.459]}
                      zoom={12}
                      showPilotDetails={true}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-extrabold text-emerald-400">150</div>
                    <div className="text-sm text-muted-foreground">bins across 5 sites</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Target savings: $225K/yr across College Avenue, Busch, Cook, Livingston, and
                    Douglass campuses. Comprehensive deployment with full analytics suite.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Dashboard Peek Widget */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Live Dashboard Preview
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-base md:text-lg">
            See real-time bin monitoring in action
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 shadow-xl">
                <CardHeader>
                  <CardTitle>Interactive Map View</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] relative">
                    <EnhancedMapView
                      bins={bins.slice(0, 50)}
                      center={[40.65, -74.2]}
                      zoom={10}
                      showPilotDetails={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <LivePeek />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Cost Comparison */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Cost Comparison
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-base md:text-lg">
            AeroBin vs Traditional Smart Bins
          </p>
          <CostComparison />
        </motion.div>
      </section>

      {/* Vision Map */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Northeast Corridor Expansion
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-base md:text-lg">Connecting smart cities across the region</p>
          <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 shadow-xl">
            <CardContent className="p-0">
              <div className="h-[400px] md:h-[450px] relative">
                <MapView
                  bins={[
                    ...bins.filter((b) => b.organization === 'Columbia University').slice(0, 5),
                    ...bins.filter((b) => b.organization === 'Rutgers University').slice(0, 5),
                  ]}
                  center={[40.65, -74.2]}
                  zoom={9}
                />
                <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-md p-3 rounded-lg border border-border shadow-lg z-[500]">
                  <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Active Pilots</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    <span className="text-xs md:text-sm font-semibold">Columbia University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    <span className="text-xs md:text-sm font-semibold">Rutgers University</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Citywide Deployment */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <CitywideDeployment />
        </motion.div>
      </section>

      {/* Smart City Coalition */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <SmartCityCoalition />
        </motion.div>
      </section>

      {/* Logos */}
      <section className="container mx-auto px-4 py-24 border-y border-border/50 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Trusted by leading institutions
          </p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {[
            { name: 'Columbia', logo: columbiaLogo },
            { name: 'Rutgers', logo: rutgersLogo },
            { name: 'NSF', logo: nsfLogo },
            { name: 'Launch Circuit', logo: launchCircuitLogo },
          ].map((sponsor, idx) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.15, y: -4 }}
              className="flex items-center justify-center"
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="h-28 w-auto max-w-[280px] object-contain transition-all duration-300 drop-shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-b from-background to-background/95 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="AeroBin Logo" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="font-semibold text-base">AeroBin</p>
                <p className="text-xs text-muted-foreground">© 2025 All rights reserved.</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 border-2 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact AeroBin</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Interested in deploying smart waste sensors at your organization?
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Email:</strong> contact@aerobin.com
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> (555) 123-4567
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </div>
  )
}


