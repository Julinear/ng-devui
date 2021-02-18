import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { TabsTransferComponent } from './tabs-transfer/tabs-transfer.component';
@Component({
    selector: 'd-configurable',
    templateUrl: './configurable-tabs.component.html',
    styleUrls: ['./configurable-tabs.component.scss']
})
export class ConfigurableComponent {
    tabActiveId = 1;
    tabsDisplay = [{
        id: 1,
        name: 'Tab1',
        content: 'Tab1 Content'
    },
    {
        id: 2,
        name: 'Tab2',
        content: 'Tab2 Content'
    },
    {
        id: 3,
        name: 'Tab3',
        content: 'Tab3 Content'
    }];
    tabsHidden = [{
        id: 4,
        name: 'Tab4',
        content: 'Tab4 Content'
    },
    {
        id: 5,
        name: 'Tab5',
        content: 'Tab5 Content'
    },
    {
        id: 6,
        name: 'Tab6',
        content: 'Tab6 Content'
    }];
    leftOffset = 202;

    constructor(private dialogService: DialogService, private el: ElementRef, private changeRef: ChangeDetectorRef) {
    }
    getLeftOffset() {
        this.leftOffset = 0;
        this.el.nativeElement.querySelectorAll('.tab-configurable').forEach(element => {
            this.leftOffset += element.offsetWidth + 35;
        });
    }
    selectForConfigTab(id) {
        this.tabActiveId = id;
    }
    openTransferDialog(dialogtype?: string) {
        const results = this.dialogService.open({
            id: 'tabs-dialog',
            width: '800px',
            maxHeight: '600px',
            showAnimate: false,
            title: 'Tabs显示配置',
            content: TabsTransferComponent,
            backdropCloseable: true,
            dialogtype: dialogtype,
            buttons: [
                {
                    cssClass: 'stress',
                    text: '确定',
                    handler: ($event: Event) => {
                        this.tabsDisplay = results.modalContentInstance.targetOption;
                        this.tabsHidden = results.modalContentInstance.sourceOption;
                        this.changeRef.detectChanges();
                        results.modalInstance.hide();
                        this.getLeftOffset();
                    },

                },
            ],
            data: {
                sourceOption: this.tabsHidden ? this.tabsHidden : [],
                targetOption: this.tabsDisplay ? this.tabsDisplay : [],
            }
        });
    }
}
