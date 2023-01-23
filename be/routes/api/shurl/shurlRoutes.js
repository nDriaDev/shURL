/**
 *
 * @param primaryRouter
 * @param {core.Router} router
 * @param {DbClient} dbClient
 */
export default function shurlRoutes(primaryRouter, router, dbClient) {
	primaryRouter.use('/shurl', router);
	router
		.post(
			'/generate',
			(req, res, next) => res.status(200).send("/generate")
		)
		.get(
			'/:code',
			(req, res, next) => res.status(200).send("/:code"+req.params.code)
		);
}