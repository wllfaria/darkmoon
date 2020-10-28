export default class ArrayUtils {
    public static groupBy = function (xs: Array<any>, key: string) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
}