import { Trash2, Edit } from "lucide-react";
import { Flash } from "../types/types";
import { deleteFlash } from "../api";

interface FlashGalleryProps {
  designs: Flash[];
}

export function FlashGallery({ designs }: FlashGalleryProps) {
  return (
    <div>
      <h3 className="mb-6 text-lg font-medium">Current Flash Designs</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {designs.map((design) => (
          <div key={design.id} className="overflow-hidden">
            <div className="p-0">
              <div className="relative aspect-square">
                <img src={design.mainImageUrl} className="object-cover" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-lg">{design.title}</div>
                <div>${design.price}</div>
              </div>
              {/* <div className="mt-2">
                Added {new Date(design.createdAt).toLocaleDateString()}
              </div> */}
            </div>
            <div className="p-4 pt-0 flex justify-between">
              <button>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button onClick={() => deleteFlash(design.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
