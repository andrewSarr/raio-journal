"use client";

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="text-sm text-rust-deep hover:text-rust cursor-pointer"
      onClick={(e) => {
        if (!confirm("Delete this post? This can't be undone.")) {
          e.preventDefault();
        }
      }}
    >
      Delete
    </button>
  );
}
