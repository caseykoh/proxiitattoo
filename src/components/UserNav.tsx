export function UserNav() {
  return (
    <div>
      <div>
        <button className="relative h-8 w-8 rounded-full">
          <div className="h-8 w-8">
            {/* <AvatarImage src="/avatars/01.png" alt="@admin" /> */}
            {/* <AvatarFallback>AD</AvatarFallback> */}
          </div>
        </button>
      </div>
      <div className="w-56">
        <div className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Admin</p>
            <p className="text-xs leading-none text-muted-foreground">
              admin@example.com
            </p>
          </div>
        </div>
        <div />
        <div>
          <div>Profile</div>
          <div>Settings</div>
        </div>
        <div />
        <div>Log out</div>
      </div>
    </div>
  );
}
