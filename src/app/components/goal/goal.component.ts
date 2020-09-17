import {Component, OnInit} from '@angular/core';
import {GoalService} from '../../services/goal.service';
import {Observable} from 'rxjs';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import {DonationService} from '../../services/donation.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
  public _goal$: Observable<any>;
  public goal: any;

  constructor(private goalService: GoalService, private donationService: DonationService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this._goal$ = this.goalService.get();
    this._goal$.subscribe((val) => {
      this.goal = val;
      this.goal.donations = this.goal.donations
        .sort((n1, n2) => {
          if (n1.amount > n2.amount) {
            return 1;
          }

          if (n1.amount < n2.amount) {
            return -1;
          }

          return 0;
        });
    });
  }

  done(donation: any) {
    if (!donation.done) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: donation.amount
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.donationService.done(donation)
            .subscribe(() => {
              this.goal.donations.map((mDonation) => {
                if (mDonation.id === donation.id) {
                  mDonation.done = true;
                  this.snackBar.open('Cool!');
                }
              });
            }, error => {
              this.snackBar.open('Das hat nicht geklappt. Diese Donation ist bereits vergeben! Bitte lade die Seite für den aktuellsten Stand neu!');
            });
        }
      });
    }
  }
}
