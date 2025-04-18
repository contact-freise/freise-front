import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-media-preview',
  templateUrl: './media-preview.component.html',
  styleUrls: ['./media-preview.component.scss'],
  imports: [CommonModule, MatButtonModule]
})
export class MediaPreviewComponent {
  constructor(
    public dialogRef: MatDialogRef<MediaPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mediaUrl: string; mediaType: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}