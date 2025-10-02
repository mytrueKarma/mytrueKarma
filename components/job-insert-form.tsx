"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  MapPin,
  Euro,
  Clock,
  Users,
  HandHeart,
  Building,
  Mail,
  Phone,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";

const jobTypes = ["Vollzeit", "Teilzeit", "Freelance", "Praktikum", "Minijob"];
const experienceLevels = ["Einsteiger", "Junior", "Senior", "Lead", "Experte"];
const categories = [
  "IT & Tech",
  "Design",
  "Marketing",
  "Beratung",
  "Gesundheit",
  "Bildung",
  "Umwelt",
  "Soziales",
  "Verkauf",
  "Verwaltung",
];

interface JobInsertFormProps {
  onClose?: () => void;
}

export function JobInsertForm({ onClose }: JobInsertFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    category: "",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    socialMission: "",
    tags: "",
    contactEmail: "",
    contactPhone: "",
    isRemote: false,
    isUrgent: false,
    applicationDeadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melden Sie sich an, um einen Job zu inserieren.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Here would be the API call to create the job listing
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast({
        title: "Job erfolgreich inseriert!",
        description:
          "Ihr Job wird nach Prüfung veröffentlicht und ist dann für alle Nutzer sichtbar.",
      });

      // Reset form
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "",
        category: "",
        experience: "",
        salary: "",
        description: "",
        requirements: "",
        benefits: "",
        socialMission: "",
        tags: "",
        contactEmail: "",
        contactPhone: "",
        isRemote: false,
        isUrgent: false,
        applicationDeadline: "",
      });

      if (onClose) onClose();
    } catch (error) {
      toast({
        title: "Fehler beim Inserieren",
        description:
          "Es gab ein Problem beim Erstellen Ihrer Stellenanzeige. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Anmeldung erforderlich</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Bitte melden Sie sich an, um Jobs zu inserieren.
          </p>
          <Button asChild>
            <a href="/auth/login">Zur Anmeldung</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-600" />
          Job inserieren
        </CardTitle>
        <p className="text-muted-foreground">
          Erstellen Sie eine Stellenanzeige und tragen Sie zu sozialen Projekten
          bei. 5% der Vermittlungsgebühr fließt in unsere Sozialprojekte.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Building className="h-3 w-3" />
                Jobtitel *
              </label>
              <Input
                required
                placeholder="z.B. React Developer"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Unternehmen *</label>
              <Input
                required
                placeholder="Ihr Unternehmen"
                value={formData.company}
                onChange={(e) => updateFormData("company", e.target.value)}
              />
            </div>
          </div>

          {/* Location and Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Standort *
              </label>
              <Input
                required
                placeholder="z.B. Berlin"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Art der Anstellung *
              </label>
              <Select
                required
                value={formData.type}
                onValueChange={(value) => updateFormData("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Typ wählen" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Kategorie *</label>
              <Select
                required
                value={formData.category}
                onValueChange={(value) => updateFormData("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie wählen" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience and Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Users className="h-3 w-3" />
                Erfahrungslevel
              </label>
              <Select
                value={formData.experience}
                onValueChange={(value) => updateFormData("experience", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Level wählen" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Euro className="h-3 w-3" />
                Gehalt
              </label>
              <Input
                placeholder="z.B. 50.000-70.000€"
                value={formData.salary}
                onChange={(e) => updateFormData("salary", e.target.value)}
              />
            </div>
          </div>

          {/* Description and Requirements */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Jobbeschreibung *</label>
              <Textarea
                required
                placeholder="Beschreiben Sie die Position, Aufgaben und Verantwortlichkeiten..."
                rows={4}
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Anforderungen</label>
              <Textarea
                placeholder="Welche Qualifikationen und Fähigkeiten sind erforderlich?"
                rows={3}
                value={formData.requirements}
                onChange={(e) => updateFormData("requirements", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Was wir bieten</label>
              <Textarea
                placeholder="Benefits, Arbeitskultur, Entwicklungsmöglichkeiten..."
                rows={3}
                value={formData.benefits}
                onChange={(e) => updateFormData("benefits", e.target.value)}
              />
            </div>
          </div>

          {/* Social Mission */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <HandHeart className="h-3 w-3 text-green-600" />
              Soziale Mission *
            </label>
            <Input
              required
              placeholder="z.B. Klimaschutz, Bildung, Soziale Gerechtigkeit"
              value={formData.socialMission}
              onChange={(e) => updateFormData("socialMission", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Beschreiben Sie, wie diese Position zu positiven
              gesellschaftlichen Veränderungen beiträgt.
            </p>
          </div>

          {/* Tags and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Skills/Tags</label>
              <Input
                placeholder="React, TypeScript, Node.js"
                value={formData.tags}
                onChange={(e) => updateFormData("tags", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Kommagetrennt</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Mail className="h-3 w-3" />
                Kontakt E-Mail *
              </label>
              <Input
                required
                type="email"
                placeholder="bewerbungen@firma.de"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Telefon (optional)
              </label>
              <Input
                placeholder="+49 123 456789"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remote"
                checked={formData.isRemote}
                onCheckedChange={(checked) =>
                  updateFormData("isRemote", checked)
                }
              />
              <label htmlFor="remote" className="text-sm">
                Remote-Arbeit möglich
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={formData.isUrgent}
                onCheckedChange={(checked) =>
                  updateFormData("isUrgent", checked)
                }
              />
              <label htmlFor="urgent" className="text-sm">
                Dringend zu besetzen
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bewerbungsfrist</label>
              <Input
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) =>
                  updateFormData("applicationDeadline", e.target.value)
                }
              />
            </div>
          </div>

          {/* Social Impact Info */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <HandHeart className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">
                Sozialer Impact
              </span>
            </div>
            <p className="text-sm text-green-700">
              5% der Vermittlungsgebühr fließen automatisch in unsere
              Sozialprojekte. Durch Ihre Stellenanzeige unterstützen Sie aktiv
              positive Veränderungen in der Gesellschaft.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Wird gespeichert..." : "Job inserieren"}
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Abbrechen
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
