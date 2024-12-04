import { FlashGallery } from "../components/FlashGallery";
import { ImageUpload } from "../components/ImageUpload";

// Mock data - in a real app, this would come from your database
const flashDesigns = [
  {
    id: "1",
    title: "Traditional Rose",
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 150,
    available: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Skull Design",
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 200,
    available: true,
    createdAt: "2024-01-19T15:30:00Z",
  },
];

export default function AdminFlashPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Flash Designs</h2>
          <p className="text-muted-foreground">
            Upload and manage your flash tattoo designs.
          </p>
        </div>
      </div>
      <div className="grid gap-8">
        <ImageUpload onChange={() => {}} maxImages={1} />
        <ImageUpload onChange={() => {}} maxImages={3} />
        <FlashGallery designs={flashDesigns} />
      </div>
    </div>
  );
}
