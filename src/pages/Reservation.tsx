import { useState } from "react";
import UserNavbar from "@/components/UserNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users, Clock, Phone, Mail, User, MessageSquare, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "none",
    specialRequests: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Reservation Details:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Reservation request sent successfully! We'll contact you shortly.");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        occasion: "none",
        specialRequests: "",
      });
    }, 3000);
  };

  // Generate time slots
  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
  ];

  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 30 days from now for max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <UserNavbar />
        <div className="container mx-auto px-4 py-20 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            <h1 className="mb-4 font-display text-3xl font-bold text-foreground">
              Reservation Request Sent! 🎉
            </h1>
            <p className="mb-6 text-muted-foreground">
              Thank you for choosing Rasa. We've received your reservation request and will confirm within 24 hours.
            </p>
            <div className="rounded-lg bg-card border border-border p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-2">Reservation Details:</h3>
              <p className="text-sm text-muted-foreground">
                {formData.name} • {formData.guests} {parseInt(formData.guests) === 1 ? 'Guest' : 'Guests'} • {formData.date} at {formData.time}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/menu">Browse Menu</Link>
              </Button>
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-accent/90 py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            Reserve Your Table
          </h1>
          <p className="mx-auto max-w-2xl text-white/90">
            Experience an unforgettable culinary journey. Book your table now and let us create a memorable dining experience for you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Make a Reservation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="pl-9"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-9"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+977 9869148791"
                        className="pl-9"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Select value={formData.guests} onValueChange={(value) => handleSelectChange("guests", value)}>
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-9"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        max={maxDateString}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)}>
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occasion">Occasion (Optional)</Label>
                  <Select value={formData.occasion} onValueChange={(value) => handleSelectChange("occasion", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="business">Business Dinner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Dietary, Seating, etc.)</Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requests or dietary restrictions..."
                      className="min-h-[100px] pl-9"
                      value={formData.specialRequests}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request Reservation"}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground">
                  By making a reservation, you agree to our cancellation policy. Free cancellation up to 2 hours before.
                </p>
              </form>
            </div>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-display text-xl font-semibold text-foreground">Opening Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium text-foreground">11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday - Sunday</span>
                  <span className="font-medium text-foreground">11:00 AM - 11:00 PM</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Order</span>
                    <span className="font-medium text-foreground">30 mins before closing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-display text-xl font-semibold text-foreground">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-muted-foreground">Pokhara-9 Chipledhunga, Kaski District, Nepal</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-muted-foreground">+977 9869148791</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground">info@rasa.com.np</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-display text-xl font-semibold text-foreground">Private Events</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Host your special events at Rasa. We offer customized menus and private dining spaces.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">Inquire About Events</Link>
              </Button>
            </div>

            <div className="rounded-lg bg-accent/10 border border-accent/20 p-6">
              <h3 className="mb-2 font-display text-xl font-semibold text-accent">Cancellation Policy</h3>
              <p className="text-sm text-muted-foreground">
                Free cancellation up to 2 hours before your reservation time. Late cancellations may incur a fee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;