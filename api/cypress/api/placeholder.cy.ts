import { COMMENTS_TO_THE_POST_COUNT, HEADERS, PHOTOS_COUNT, POSTS_COUNT, TODOS_COUNT } from "../support/constants/constants"
describe("HTTPS tests", () => {
    describe("Posts", () => {
        const max = POSTS_COUNT
        const min = 1
        const id = Math.floor(Math.random() * (max - min) + min)
        const postCredit: any = {
            title: 'foo',
            body: 'bar',
            userId: id,
        }
        const body_patch = {
            title: 'I love Cypress'
        }
        it(`Should get all Posts correctly`, () => {
            cy.request({ method: 'GET', url: '/posts' }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(POSTS_COUNT)
            })
        })
        it(`Should get Post id=${id}`, () => {
            cy.request({ method: 'GET', url: `/posts/${id}` }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(id)
            })
        })
        it(`Should get comments for post id=${id} correctly`, () => {
            cy.request({ method: 'GET', url: `/posts/${id}/comments` }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(COMMENTS_TO_THE_POST_COUNT)
                res.body.forEach((el: { postId: number }) => {
                    expect(el.postId).to.equal(id)
                });
            })
        })
        it(`Email in comments should has valid value`, () => {
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            cy.request({ method: 'GET', url: `/posts/${id}/comments` }).then(res => {
                expect(res.status).to.equal(200)
                res.body.forEach((el: { email: string }) => {
                    const result = el.email.match(reg)
                    if (expect(result).to.not.equal(null)) {
                        expect(result![0]).to.equal(el.email)
                    }
                });
            })
        })
        it(`Should add new post correctly`, () => {
            cy.request({
                method: 'POST',
                url: `/posts/`,
                headers: HEADERS,
                body: postCredit
            }).then(res => {
                expect(res.status).to.equal(201)
                for (const key in postCredit) {
                    expect(res.body[key]).to.equal(postCredit[key])
                }
            });
        })
        it(`Should patching a post correctly`, () => {
            cy.request({
                method: 'PATCH',
                url: `/posts/${id}`,
                headers: HEADERS,
                body: body_patch
            }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(id)
                expect(res.body.title).to.equal(body_patch.title)
            });
        })
        it(`Should get error status code`, () => {
            cy.request({ method: 'GET', url: `/posts/${POSTS_COUNT + 1}`, failOnStatusCode: false }).then(res => {
                expect(res.status).to.equal(404)
            })
        })
    })



    describe("Photos", () => {
        const max = PHOTOS_COUNT
        const min = 1
        const id = Math.floor(Math.random() * (max - min) + min)
        const maxAlbumId = 100
        const albumId = Math.floor(Math.random() * (maxAlbumId - min) + min)
        const countAlbumsForOnePhoto = 50
        const domain = 'https://via.placeholder.com/600/'
        const photoCredit: any = {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing"
        }
        const photoCreditForPUT: any = {
            albumId: 112,
            title: "officia porro iure quia iusto qui ipsa ut modi",
            url: "https://via.placeholder.com/600/24f355",
            thumbnailUrl: "https://via.placeholder.com/150/24f355"
        }

        it(`Should get correctly get all Photos`, () => {
            cy.request({ method: 'GET', url: '/photos' }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(PHOTOS_COUNT)
            })
        })
        it(`Should get Photo id=${id}`, () => {
            cy.request({ method: 'GET', url: `/photos/${id}` }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(id)
            })
        })
        it(`URL in photos should has valid domain`, () => {
            cy.request({ method: 'GET', url: `/photos` }).then(res => {
                expect(res.status).to.equal(200)
                res.body.forEach((el: { url: string }) => {
                    expect(el.url).to.include(domain)
                });
            })
        })
        it(`Should get photos for albumId=${albumId} correctly`, () => {
            cy.request({ method: 'GET', url: `/photos/?albumId=${albumId}` }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(countAlbumsForOnePhoto)
                res.body.forEach((el: { albumId: number }) => {
                    expect(el.albumId).to.equal(albumId)
                });
            })
        })
        it(`Should add new photo correctly`, () => {
            cy.request({
                method: 'POST',
                url: `/photos/`,
                headers: HEADERS,
                body: photoCredit
            }).then(res => {
                expect(res.status).to.equal(201)
                expect(res.body.title).to.equal(photoCredit.title)

            });
        })
        it(`Should PUT a photos correctly`, () => {
            cy.request({
                method: 'PUT',
                url: `/photos/${id}`,
                headers: HEADERS,
                body: photoCreditForPUT
            }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(id)
                for (const key in photoCreditForPUT) {
                    expect(res.body[key]).to.equal(photoCreditForPUT[key])
                }
            });
        })
        it(`Should get error status code`, () => {
            cy.request({ method: 'GET', url: `/photos/${PHOTOS_COUNT + 1}`, failOnStatusCode: false }).then(res => {
                expect(res.status).to.equal(404)
            })
        })
    })



    describe("Todos", () => {
        const max = TODOS_COUNT
        const min = 1
        const id = Math.floor(Math.random() * (max - min) + min)
        const maxUserId = 10
        const userId = Math.floor(Math.random() * (maxUserId - min) + min)
        const todoCredit: any = {
            userId: 1,
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            completed: false
        }
        const todoCreditForPatch: any = {
            title: "Something interesting"
        }
        it(`Should get correctly get all Todos`, () => {
            cy.request({ method: 'GET', url: '/todos' }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(TODOS_COUNT)
            })
        })
        it(`Should get Todo id=${id}`, () => {
            cy.request({ method: 'GET', url: `/todos/${id}` }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(id)
            })
        })
        it(`Should get todos which have userId=${userId}`, () => {
            cy.request({ method: 'GET', url: `/todos?userId=${userId}` }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.length).to.equal(20)
                res.body.forEach((el: { userId: number }) => {
                    expect(el.userId).to.equal(userId)
                });
            })
        })
        it(`Should add new todo correctly`, () => {
            cy.request({
                method: 'POST',
                url: `/todos/`,
                headers: HEADERS,
                body: todoCredit
            }).then(res => {
                expect(res.status).to.equal(201)
                for (const key in todoCredit) {
                    expect(res.body[key]).to.equal(todoCredit[key])
                }
            });
        })
        it(`Should delete a todos id=${id} correctly`, () => {
            cy.request({
                method: 'DELETE',
                url: `/todos/${id}`,
                headers: HEADERS
            }).then(res => {
                expect(res.status).to.equal(200)
            });
        })
        it(`Should patching a todo correctly`, () => {
            cy.request({
                method: 'PATCH',
                url: `/todos/${id}`,
                headers: HEADERS,
                body: todoCreditForPatch
            }).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(id)
                expect(res.body.title).to.equal(todoCreditForPatch.title)
            });
        })
        it(`Should get error status code`, () => {
            cy.request({ method: 'GET', url: `/todos/${TODOS_COUNT + 1}`, failOnStatusCode: false }).then(res => {
                expect(res.status).to.equal(404)
            })
        })
    })
})