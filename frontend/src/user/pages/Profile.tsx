import React, { useState } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateProfileApi } from "@/api/userApi";
import { updateAddressApi } from "@/api/addressApi";


const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
  });


  const handleProfileUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user) return;

  try {
    await updateProfileApi(user.id, {
      name: profileData.name,
      phone: profileData.phone,
    });

    await updateAddressApi(user.id, {
      street: profileData.street,
      city: profileData.city,
      state: profileData.state,
      zipCode: profileData.zipCode,
      country: profileData.country,
    });

    updateProfile({
      name: profileData.name,
      phone: profileData.phone,
      address: {
        street: profileData.street,
        city: profileData.city,
        state: profileData.state,
        zipCode: profileData.zipCode,
        country: profileData.country,
      },
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  } catch (error) {
    toast({
      title: "Update failed",
      description: "Could not update profile. Try again.",
      variant: "destructive",
    });
  }
};

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-0 shadow-lg h-fit">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl gradient-primary text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-md">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <h2 className="text-xl font-display font-bold">{user?.name}</h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Member since {new Date(user?.createdAt || '').getFullYear()}
            </p>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) =>
                              setProfileData({ ...profileData, name: e.target.value })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            disabled
                            className="pl-10 bg-muted"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) =>
                              setProfileData({ ...profileData, phone: e.target.value })
                            }
                            className="pl-10"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="gradient-primary shadow-primary">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="street"
                          value={profileData.street}
                          onChange={(e) =>
                            setProfileData({ ...profileData, street: e.target.value })
                          }
                          className="pl-10"
                          placeholder="123 Main Street"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) =>
                            setProfileData({ ...profileData, city: e.target.value })
                          }
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={profileData.state}
                          onChange={(e) =>
                            setProfileData({ ...profileData, state: e.target.value })
                          }
                          placeholder="NY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={profileData.zipCode}
                          onChange={(e) =>
                            setProfileData({ ...profileData, zipCode: e.target.value })
                          }
                          placeholder="10001"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={profileData.country}
                          onChange={(e) =>
                            setProfileData({ ...profileData, country: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <Button type="submit" className="gradient-primary shadow-primary">
                      <Save className="mr-2 h-4 w-4" />
                      Save Address
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
