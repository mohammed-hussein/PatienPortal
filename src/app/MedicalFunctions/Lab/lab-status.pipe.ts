import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'LabStatus'
})

export class LabStatusPipe implements PipeTransform {
    transform(value: any[], args: any[]): any[] {
        if (value) {
            value.forEach(item => {
                if (item !== null && item.status !== 'Result') {
                    item.status = '--';
                }
            });
        }
        return value;
    }
}
