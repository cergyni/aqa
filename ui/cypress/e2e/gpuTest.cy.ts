import { NO_PRODUCT_MESSAGE_TEXT } from "../support/constants/constants"
import { GpuPage } from "../support/pages/gpuPage"
import { PageFactory } from "../support/pages/pageFacory"
import { COMPUTER_TECHNOLOGY_CATEGORIES, INPUT_MEMORY_SIZE_GPU, INPUT_NAME_GPU, PAGES } from "../support/types/types"

describe("GPU page test", () => {
    const gpuPage = PageFactory.getPage(PAGES.GPU) as GpuPage
    beforeEach(() => {
        gpuPage.visitPage()
    })
    it(`Should show ${INPUT_NAME_GPU.GIGABUTE} GPU `, () => {
        gpuPage.categoryMenu.inputInFindByNameField(INPUT_NAME_GPU.GIGABUTE)
        gpuPage.compareEnteredNameWithNameOfAdds(INPUT_NAME_GPU.GIGABUTE)
    })
    it(`Input invalid GPU name: ${INPUT_NAME_GPU.INVALID_VALUE}, should show ${NO_PRODUCT_MESSAGE_TEXT} message`, () => {
        gpuPage.categoryMenu.inputInFindByNameField(INPUT_NAME_GPU.INVALID_VALUE)
        gpuPage.checkNotExistingProductElementTextMessage()
    })
    it(`Should show GPU which has memory size from ${INPUT_MEMORY_SIZE_GPU.TEN_GB}  `, () => {
        gpuPage.chooseMemorySizeFrom(INPUT_MEMORY_SIZE_GPU.TEN_GB)
        gpuPage.compareMemorySizeFromDescriptionWithEnteredValue(INPUT_MEMORY_SIZE_GPU.TEN_GB, true)
    })
    it(`Should show GPU which has memory size before ${INPUT_MEMORY_SIZE_GPU.SIX_GB}  `, () => {
        gpuPage.chooseMemorySizeBefore(INPUT_MEMORY_SIZE_GPU.SIX_GB)
        gpuPage.compareMemorySizeFromDescriptionWithEnteredValue(INPUT_MEMORY_SIZE_GPU.SIX_GB, false)
    })
})