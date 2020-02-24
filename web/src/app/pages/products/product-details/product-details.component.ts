import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISku } from 'src/app/models/sku.model';
import { selectCurrentProduct } from 'src/app/core/store/selectors/product.selector';
import { SubSink } from 'subsink';
import { EProductActions, GetCurrentProduct, GetCurrentProductSuccess, UpdateCurrentProduct, GetCurrentProductFailed } from 'src/app/core/store/actions/product.action';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ofType } from '@ngrx/effects';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
	constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store$: Store<IAppState>,
        private actions$: ActionsSubject
	) {
		this.product$ = this.store$.select(selectCurrentProduct);
	}

	// ! Ngrx definitions
	private product$: Observable<ISku>;

    private subs: SubSink = new SubSink

    // ! General variable definitions
    private productUrl: string;
    private productType: string;

    // ! Error definitions
    public requestError: boolean;

	public loading: boolean;

	ngOnInit() {
        this.setupPage();
        this.checkCurrentProduct();
        this.getCurrentProductSuccessActionSubscription();
        this.getCurrentProductFailedActionSubscription();
	}

	private setupPage = (): void => {
		this.loading = true;
	}

	private checkLoading = (): void => {
		if (
			true
		) {
			this.loading = false;
		}
    }

    private checkCurrentProduct = (): void => {
        this.subs.add(this.product$.subscribe((product: ISku): void => {
            if(!product) {
                this.getProductUrl();
                this.getProductType();
                return;
            }
        }))
    }

    private getProductUrl = (): void => {
        this.subs.add(this.route.params.subscribe((params: Params): void => {
            this.productUrl = params.product;
            this.fetchCurrentProduct();
        }));
    }

    private getProductType = (): void => {
        const indexOfProductTypeInURL: number = 2;
        this.productType = this.router.url.split('/')[indexOfProductTypeInURL];
    }

    private getCurrentProductSuccessActionSubscription = (): void => {
        this.subs.add(this.actions$.pipe(
            ofType<GetCurrentProductSuccess>(EProductActions.GetCurrentProductSuccess)).subscribe((action: GetCurrentProductSuccess): void => {
                this.store$.dispatch(new UpdateCurrentProduct(action.payload.body));
            }
        ))
    }

    private getCurrentProductFailedActionSubscription = (): void => {
        this.subs.add(this.actions$.pipe(
            ofType<GetCurrentProductFailed>(EProductActions.GetCurrentProductFailed)).subscribe((action: GetCurrentProductFailed): void => {
                this.requestError = true;
            }
        ))
    }

    private fetchCurrentProduct = (): void => {
        this.store$.dispatch(new GetCurrentProduct(this.productUrl));
    }

    ngOnDestroy() {
        this.subs.unsubscribe()
    }
}
