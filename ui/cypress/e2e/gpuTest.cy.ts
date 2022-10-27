import { NO_PRODUCT_MESSAGE_TEXT } from "../support/constants/constants"
import { GpuPage } from "../support/pages/gpuPage"
import { PageFactory } from "../support/pages/pageFacory"
import { CATEGORIES_COMP, INPUT_MEMORY_SIZE_GPU, INPUT_NAME_GPU, PAGES } from "../support/types/types"

describe("GPU page test", () => {
    describe(`324234234234234`, () => {
        const gpu = PageFactory.getPage(PAGES.GPU) as GpuPage
        beforeEach(() => {
            gpu.visitPage()
        })
        it(`Should show ${INPUT_NAME_GPU.GIGABUTE} GPU `, () => {
            gpu.categoryMenu.inputInFieldFindByName(INPUT_NAME_GPU.GIGABUTE)
            gpu.compareEnteredNameWithNameOfAdds(INPUT_NAME_GPU.GIGABUTE)
        })
        it(`Input invalid GPU name: ${INPUT_NAME_GPU.INVALID_VALUE}, should show ${NO_PRODUCT_MESSAGE_TEXT} message`, () => {
            gpu.categoryMenu.inputInFieldFindByName(INPUT_NAME_GPU.INVALID_VALUE)
            gpu.checkTextMessage()
        })
        it(`Should show GPU which has memory size from ${INPUT_MEMORY_SIZE_GPU.TEN_GB}  `, () => {
            gpu.chooseMemorySizeFrom(INPUT_MEMORY_SIZE_GPU.TEN_GB)
            gpu.compareMemorySizeFromDescriptionWithEnteredValue(INPUT_MEMORY_SIZE_GPU.TEN_GB, true)
        })
        it(`Should show GPU which has memory size before ${INPUT_MEMORY_SIZE_GPU.SIX_GB}  `, () => {
            gpu.chooseMemorySizeBefore(INPUT_MEMORY_SIZE_GPU.SIX_GB)
            gpu.compareMemorySizeFromDescriptionWithEnteredValue(INPUT_MEMORY_SIZE_GPU.SIX_GB, false)
        })

    })

})