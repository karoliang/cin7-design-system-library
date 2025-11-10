import type { CodeVariant } from './types';

// Import all category modules
import * as actions from './actions';
import * as forms from './forms';
import * as navigation from './navigation';
import * as feedback from './feedback';
import * as dataDisplay from './dataDisplay';
import * as media from './media';
import * as layout from './layout';
import * as charts from './charts';
import * as utilities from './utilities';
import * as patterns from './patterns';
import * as integration from './integration';
import * as theming from './theming';

// Combine all examples
const allExamples = {
  ...actions,
  ...forms,
  ...navigation,
  ...feedback,
  ...dataDisplay,
  ...media,
  ...layout,
  ...charts,
  ...utilities,
  ...patterns,
  ...integration,
  ...theming,
};

export function getCodeExample(componentName: string, exampleName: string): CodeVariant | null {
  const examples: Record<string, Record<string, CodeVariant>> = {
    button: allExamples.buttonExamples,
    bulkactions: allExamples.bulkActionsExamples,
    pageactions: allExamples.pageActionsExamples,
    link: allExamples.linkExamples,
    actionmenu: allExamples.actionMenuExamples,
    buttongroup: allExamples.buttonGroupExamples,
    textfield: allExamples.textFieldExamples,
    select: allExamples.selectExamples,
    checkbox: allExamples.checkboxExamples,
    radiobutton: allExamples.radioButtonExamples,
    checkboxgroup: allExamples.checkboxGroupExamples,
    optionlist: allExamples.optionListExamples,
    formpanel: allExamples.formPanelExamples,
    autocomplete: allExamples.autocompleteExamples,
    choicelist: allExamples.choiceListExamples,
    colorpicker: allExamples.colorPickerExamples,
    combobox: allExamples.comboboxExamples,
    datepicker: allExamples.datePickerExamples,
    formlayout: allExamples.formLayoutExamples,
    labelled: allExamples.labelledExamples,
    inlineerror: allExamples.inlineErrorExamples,
    rangeslider: allExamples.rangeSliderExamples,
    form: allExamples.formExamples,
    topbar: allExamples.topbarExamples,
    fullscreenbar: allExamples.fullscreenbarExamples,
    contextualsavebar: allExamples.contextualsavebarExamples,
    frame: allExamples.frameExamples,
    pagination: allExamples.paginationExamples,
    navigation: allExamples.navigationExamples,
    tabs: allExamples.tabsExamples,
    breadcrumbs: allExamples.breadcrumbsExamples,
    modal: allExamples.modalExamples,
    banner: allExamples.bannerExamples,
    calloutcard: allExamples.calloutcardExamples,
    emptystate: allExamples.emptystateExamples,
    loading: allExamples.loadingExamples,
    skeletonpage: allExamples.skeletonPageExamples,
    progressbar: allExamples.progressbarExamples,
    spinner: allExamples.spinnerExamples,
    toast: allExamples.toastExamples,
    popover: allExamples.popoverExamples,
    tooltip: allExamples.tooltipExamples,
    sheet: allExamples.sheetExamples,
    badge: allExamples.badgeExamples,
    tag: allExamples.tagExamples,
    avatar: allExamples.avatarExamples,
    icon: allExamples.iconExamples,
    datatable: allExamples.dataTableExamples,
    descriptionlist: allExamples.descriptionListExamples,
    exceptionlist: allExamples.exceptionListExamples,
    indextable: allExamples.indexTableExamples,
    list: allExamples.listExamples,
    resourceitem: allExamples.resourceItemExamples,
    resourcelist: allExamples.resourceListExamples,
    image: allExamples.imageExamples,
    mediacard: allExamples.mediacardExamples,
    thumbnail: allExamples.thumbnailExamples,
    videothumbnail: allExamples.videothumbnailExamples,
    divider: allExamples.dividerExamples,
    alphastack: allExamples.alphastackExamples,
    bleed: allExamples.bleedExamples,
    box: allExamples.boxExamples,
    grid: allExamples.gridExamples,
    inlinestack: allExamples.inlinestackExamples,
    verticalstack: allExamples.verticalstackExamples,
    collapsible: allExamples.collapsibleExamples,
    textcontainer: allExamples.textContainerExamples,
    blockstack: allExamples.blockstackExamples,
    layout: allExamples.layoutExamples,
    page: allExamples.pageExamples,
    linechart: allExamples.lineChartExamples,
    barchart: allExamples.barChartExamples,
    piechart: allExamples.pieChartExamples,
    areachart: allExamples.areaChartExamples,
    scatterchart: allExamples.scatterChartExamples,
    waterfallchart: allExamples.waterfallChartExamples,
    backdrop: allExamples.backdropExamples,
    dropzone: allExamples.dropzoneExamples,
    keyboardkey: allExamples.keyboardkeyExamples,
    text: allExamples.textExamples,
    truncate: allExamples.truncateExamples,
    filters: allExamples.filtersExamples,
    scrollable: allExamples.scrollableExamples,
    appprovider: allExamples.appProviderExamples,
    indexfilters: allExamples.indexFiltersExamples,
    footerhelp: allExamples.footerHelpExamples,
    keypresslistener: allExamples.keypressListenerExamples,
    coreutilities: allExamples.coreUtilitiesExamples,
    ecommercecomponents: allExamples.ecommerceComponentsExamples,
    usecase: allExamples.useCaseExamples,
    repository: allExamples.repositoryExamples,
    domainmodels: allExamples.domainModelsExamples,
    valueobjects: allExamples.valueObjectsExamples,
    servicelayer: allExamples.serviceLayerExamples,
    eventbus: allExamples.eventBusExamples,
    basiccomponents: allExamples.basicComponentsExamples,
    productdashboard: allExamples.productDashboardExamples,
    orderprocessing: allExamples.orderProcessingExamples,
    inventorymanagement: allExamples.inventoryManagementExamples,
    customerportal: allExamples.customerPortalExamples,
    analyticsdashboard: allExamples.analyticsDashboardExamples,
    themeplayground: allExamples.themePlaygroundExamples,
    themedocumentation: allExamples.themeDocumentationExamples,
  };

  const componentExamples = examples[componentName.toLowerCase()];
  if (!componentExamples) {
    console.warn(`No code examples found for component: ${componentName}`);
    return null;
  }

  const example = componentExamples[exampleName];
  if (!example) {
    console.warn(`No example "${exampleName}" found for component: ${componentName}`);
    return null;
  }

  return example;
}
