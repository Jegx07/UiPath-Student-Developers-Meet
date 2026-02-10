import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Clock, MapPin, Navigation } from "lucide-react";

const locationHighlights = [
  {
    icon: MapPin,
    title: "Venue",
    description: "SRL Auditorium",
  },
  {
    icon: Clock,
    title: "Check-in",
    description: "Opens at 8:30 AM",
  },
  {
    icon: Navigation,
    title: "Access",
    description: "Follow on-campus event signage",
  },
];

export const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.08) 1px, transparent 0)",
        backgroundSize: "56px 56px",
      }} />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Location
          </span>
          <h2 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-sdc-dark mb-6">
            Find The <span className="text-primary">Venue</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to arrive with ease and start the day on time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="address-card">
              <h3 className="font-display font-bold text-2xl text-sdc-dark mb-3">
                SRL Auditorium
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Check in at the main entrance. Event staff will guide you from the foyer to the hall.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps?q=SRL%20Auditorium"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full btn-hover"
                >
                  Get Directions
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  Doors open 8:30 AM
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {locationHighlights.map((item) => (
                <div key={item.title} className="clean-card p-5 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-sdc-dark mb-1">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-border shadow-lg">
              <iframe
                title="SRL Auditorium map"
                src="https://www.google.com/maps?q=SRL%20Auditorium&output=embed"
                className="w-full h-[340px] md:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="absolute -bottom-6 left-8 right-8 glass-card-light rounded-2xl p-4 text-sm text-sdc-dark shadow-md">
              Keep an eye out for SDC Meet signage near the main lobby for quick assistance.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
