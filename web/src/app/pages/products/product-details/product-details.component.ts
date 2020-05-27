import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISku } from 'src/app/models/sku.model';
import { selectCurrentProduct } from 'src/app/core/store/selectors/product.selector';
import { SubSink } from 'subsink';
import { EProductActions, GetCurrentProduct, GetCurrentProductSuccess, UpdateCurrentProduct, GetCurrentProductFailed } from 'src/app/core/store/actions/product.action';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { IGetCurrentProductRequest } from 'src/app/models/serverRequests/getCurrentProduct.model';
import { IProductImage } from 'src/app/models/productImage.model';
import { IconDefinition, faCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/core/services/product.service';
import { ISizeMap } from 'src/app/models/custom/sizeMap.model';
import { LocalCartService } from 'src/app/core/services/localcart.service';
import { ICartState } from 'src/app/core/store/state/cart.state';
import { AddCartItem, GetCurrentCart, GetCurrentCartSuccess, ECartActions } from 'src/app/core/store/actions/cart.action';
import { selectCurrentCart } from 'src/app/core/store/selectors/cart.selector';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
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
    public product: ISku;
    public sizeCount: ISizeMap;
    public sizeKeys: any;
    public sizeUnavailable: boolean;
    public selectedSize: string;
    public previewImage: IProductImage;
    public productQuantity: number;
    public showCart: boolean;

    // ! Error definitions
    public requestError: boolean;

    public loading: boolean;
    private productLoaded: boolean;

    // ! Icon definitions
    public circleIcon: IconDefinition = faCircle;
    public plusIcon: IconDefinition = faPlus;
    public minusIcon: IconDefinition = faMinus;

    ngOnInit() {
        this.setupPage();
        this.checkCurrentProduct();
        this.getCurrentProductSuccessActionSubscription();
        this.getCurrentProductFailedActionSubscription();
    }

    private setupPage = (): void => {
        this.loading = true;
        this.productQuantity = 1;
    }

    private checkLoading = (): void => {
        if (this.productLoaded) {
            this.loading = false;
        }
    }

    private checkCurrentProduct = (): void => {
        this.subs.add(this.product$.subscribe((product: ISku): void => {
            this.getProductUrl();
            this.getProductType();
            if (!product) {
                this.fetchCurrentProduct();
                return;
            }
            const isSameProduct: boolean = this.productUrl === product.product_url;
            if (!isSameProduct) {
                this.fetchCurrentProduct();
                return;
            }
            this.setupProduct(product);
        }));
    }

    private setupProduct = (product: ISku): void => {
        this.product = product;
        this.sizeCount = this.productService.calculateSizeCount(this.product, this.productType);
        this.sizeKeys = Object.keys
        this.setProductPreview();
        this.productLoaded = true;
        this.checkLoading();
    }

    private getProductUrl = (): void => {
        this.subs.add(this.route.params.subscribe((params: Params): void => {
            this.productUrl = params.product;
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
                this.setupProduct(action.payload.body);
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
        const productInfo: IGetCurrentProductRequest = { productUrl: this.productUrl, productType: this.productType };
        this.store$.dispatch(new GetCurrentProduct(productInfo));
    }

    public setProductPreview = (productImage?: IProductImage): void => {
        this.previewImage = productImage || this.product.images[0];
    }

    public selectSize = (size: string): void => {
        if (this.sizeCount[size] === 0) {
            this.sizeUnavailable = true;
            return;
        }
        this.sizeUnavailable = false;
        this.selectedSize = size;
    }

    public incrementProductQuantity = (): void => {
        this.productQuantity = this.productQuantity + 1;
    }

    public decrementProductQuantity = (): void => {
        if (this.productQuantity === 1) { return; }
        this.productQuantity = this.productQuantity - 1;
    }

    /**
     * Adds the product to the cart with the desired quantity
     */
    public addToCart = (): void => {
        for (let i = 0; i < this.productQuantity; i++) {
            this.store$.dispatch(new AddCartItem(this.product));
        }
        this.productQuantity = 0;
        // ToDo - Change this to a beautiful message
        alert("Adicionado com sucesso")
    }

    ngOnDestroy() {
        this.subs.unsubscribe()
    }
}
