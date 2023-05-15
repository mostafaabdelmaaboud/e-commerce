import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    public matDialig: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  confirm() {
    this.matDialig.closeAll();
  }
  close() {
    this.dialogRef.close();

  }
}
